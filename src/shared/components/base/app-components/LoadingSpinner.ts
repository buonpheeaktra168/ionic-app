import { loadingController } from "@ionic/vue";

export class LoadingSpinner {
  static isLoading: boolean;

  static async present() {
    this.isLoading = true;
    return await loadingController
      .create({
        spinner: "bubbles",
      })
      .then((a) => {
        a.present();
      });
  }

  static async dismiss() {
    this.isLoading = false;
    return await loadingController.dismiss();
  }
}
