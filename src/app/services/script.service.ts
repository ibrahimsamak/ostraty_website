import { Injectable } from '@angular/core';

interface Scripts {
  name: string;
  src: string;
}

export const ScriptStore: Scripts[] = [
  { name: 'script2',  src: 'assets/js/jquery-2.2.4.min.js' },
  { name: 'script3',  src: 'assets/js/bootstrap.min.js' },
  { name: 'script4',  src: 'assets/js/mixitup.min.js' },
  { name: 'script5',  src: 'assets/js/select2.min.js' },
  { name: 'script6',  src: 'assets/js/jquery.colorbox-min.js' },
  { name: 'script7',  src: 'assets/js/slick.min.js' },
  { name: 'script8',  src: 'assets/js/wow.min.js' },
  { name: 'script9',  src: 'assets/js/revolution/jquery.themepunch.tools.min.js' },
  { name: 'script10', src: 'assets/js/revolution/jquery.themepunch.revolution.min.js' },
  { name: 'script11', src: 'assets/js/revolution/extensions/revolution.extension.actions.min.js' },
  { name: 'script12', src: 'assets/js/revolution/extensions/revolution.extension.layeranimation.min.js' },
  { name: 'script13', src: 'assets/js/revolution/extensions/revolution.extension.navigation.min.js' },
  { name: 'script14', src: 'assets/js/revolution/extensions/revolution.extension.slideanims.min.js' },
  { name: 'script15', src: 'assets/js/revolution-active.js' },
  { name: 'script16',  src: 'assets/js/custom.js' }
];
declare var document: any;

@Injectable()
export class DynamicScriptLoaderService {

  private scripts: any = {};

  constructor() {
    ScriptStore.forEach((script: any) => {
      this.scripts[script.name] = {
        loaded: false,
        src: script.src,
        name: script.name
      };
    });
  }

  load(...scripts: string[]) {
    const promises: any[] = [];
    scripts.forEach((script) => promises.push(this.loadScript(script)));
    return Promise.all(promises);
  }

  loadScript(name: string) {
    return new Promise((resolve, reject) => {
      if (!this.scripts[name].loaded) {
        // load script
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = this.scripts[name].src;
        if (this.scripts[name].name === 'react-app') {
          script.type = 'text/babel';
        if (script.readyState) {  // IE
          script.onreadystatechange = () => {
            if (script.readyState === 'loaded' || script.readyState === 'complete') {
              script.onreadystatechange = null;
              this.scripts[name].loaded = true;
              resolve({script: name, loaded: true, status: 'Loaded'});
            }
          };
        } else {  // Others
          script.onload = () => {
            this.scripts[name].loaded = true;
            resolve({script: name, loaded: true, status: 'Loaded'});
          };
        }
        }
        script.onerror = (error: any) => resolve({script: name, loaded: false, status: 'Loaded'});
        document.getElementsByTagName('body')[0].appendChild(script);
        // document.getElementsByTagName('head')[0].appendChild(script);
      } else {
        resolve({ script: name, loaded: true, status: 'Already Loaded' });
      }
    });
  }

}
