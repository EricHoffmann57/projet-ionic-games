import {Component, Injectable} from '@angular/core';
import {Directory, Filesystem} from '@capacitor/filesystem';
import {LoadingController, NavController, Platform, ToastController} from '@ionic/angular';
import {Camera, CameraResultType, CameraSource, Photo} from '@capacitor/camera';
import {NavigationExtras} from '@angular/router';

const IMAGE_DIR = 'stored-images';

interface LocalFile {
  name: string;
  path: string;
  data: string;
}
@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  images: LocalFile[] = [];

  constructor(
    private plt: Platform,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    public nav: NavController
  ) {}

  async ngOnInit() {
    this.loadFiles();
  }

  async loadFiles() {
    this.images = [];

    const loading = await this.loadingCtrl.create({
      message: 'Loading data...',
    });
    await loading.present();

    Filesystem.readdir({
      path: IMAGE_DIR,
      directory: Directory.Data,
    }).then(result => {
        this.loadFileData(result.files);
      },
      async (err) => {
        // Folder does not yet exists!
        await Filesystem.mkdir({
          path: IMAGE_DIR,
          directory: Directory.Data,
        });
      }
    ).then(_ => {
      loading.dismiss();
    });
  }

  // Get the actual base64 data of an image
  // base on the name of the file
  async loadFileData(fileNames: string[]) {
    for (const f of fileNames) {
      const filePath = `${IMAGE_DIR}/${f}`;

      const readFile = await Filesystem.readFile({
        path: filePath,
        directory: Directory.Data,
      });

      this.images.push({
        name: f,
        path: filePath,
        data: `data:image/jpeg;base64,${readFile.data}`,
      });
    }
  }

  // Little helper
  async presentToast(text) {
    const toast = await this.toastCtrl.create({
      message: text,
      duration: 3000,
    });
    await toast.present();
  }

 //Photos source
  async selectImage() {
    try {
      const image = await Camera.getPhoto({
        quality: 100,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Prompt
      });

      if (image) {
        this.saveImage(image);
      }
    } catch (e) {
      this.presentToast('Action cancelled!');
    }
  }

  async saveImage(photo: Photo) {
    const base64Data = await this.readAsBase64(photo);

    const fileName = new Date().getTime() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      path: `${IMAGE_DIR}/${fileName}`,
      data: base64Data,
      directory: Directory.Data
    });

    // Reload the file list
    // Improve by only loading for the new image and unshifting array!
    this.loadFiles();
  }

  private async readAsBase64(photo: Photo) {
    if (this.plt.is('hybrid')) {
      const file = await Filesystem.readFile({
        path: photo.path
      });

      return file.data;
    } else {
      // Fetch the photo, read as a blob, then convert to base64 format
      const response = await fetch(photo.webPath);
      const blob = await response.blob();

      return await this.convertBlobToBase64(blob) as string;
    }
  }

  // Helper function
  convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

  async deleteImage(file: LocalFile) {
    if (confirm('Are you sure to delete this file ?')) {
      await Filesystem.deleteFile({
        directory: Directory.Data,
        path: file.path
      });
      this.loadFiles();
      this.presentToast('File removed.');
    }
  }
  sendImages(){
    const navigationExtras: NavigationExtras = {
      queryParams: {
        images: JSON.stringify(this.images),
      }
    };
    this.nav.navigateForward(['tab/photos'], navigationExtras);
    console.log(navigationExtras);
  }
}
