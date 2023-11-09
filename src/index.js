import {Store} from 'cx/data';
import {Controller, KeySelection} from 'cx/ui';
import {startAppLoop} from "./startAppLoop";
import {Grid, Section} from "cx/widgets";
import {applyThemeOverrides} from "cx-theme-space-blue";
import {render} from "@react-email/render";
import "./index.scss";
import {Button} from "@react-email/components";
const emailContext = require.context('../emails', true, /\.js$/);


applyThemeOverrides();


const loadEmailComponents = () => {
  const keys = emailContext.keys();
  return keys.map(key => {
    const EmailComponent = emailContext(key).default;
    return {
      name: key.replace('./', '').replace('.js', ''),
      component: EmailComponent
    };
  });
};

const store = new Store();


class PageController extends Controller {
  onInit() {
    if (super.init) super.init();
    const components = loadEmailComponents();
    this.store.init('$page.records', components);
    this.store.init('$page.selection', components[0].name);
    this.addTrigger('emailSelection', ['$page.selection'], (selection) => {
      const Email = components.find(c => c.name === selection).component
      this.store.set('$page.email', render(<Email />));
    }, true);
  }
}

const App = () => (
  <cx>
    <main controller={PageController}
          class="flex-1 flex items-center justify-evenly text-gray-700 font-bold tracking-wide leading-loose gap-2 py-3">
      <Section mod="well">
        <Grid
          records-bind="$page.records"
          style={{width: "100%"}}
          selection={{type: KeySelection, bind:'$page.selection', keyField: 'name'}}
          columns={[
            {field: 'name', header: 'Name'}
          ]}
        />
      </Section>
      <Section mod="well" class="h-full relative">
        <iframe
          class="w-[800px] h-full"
          srcDoc-bind="$page.email"
        />
        <div className="absolute top-2 right-2 z-50">
          <button class="bg-blue-500 text-white hover:bg-blue-700 font-bold py-2 px-4 rounded"
                  icon="download"
                  onClick={
                    (e, {store}) => {
                      navigator.clipboard.writeText(store.get('$page.email'));
                    }
                  }>
            Copy HTML
          </button>
        </div>
      </Section>
    </main>
  </cx>
);


window.addEventListener('resize', () => {
  document.body.style.height = window.innerHeight + 'px';
})

window.addEventListener('load', function () {
  document.body.style.height = window.innerHeight + 'px';
  const $app = document.getElementById('app');
  $app.classList.add('w-full', 'h-full', 'flex', 'flex-col');
  startAppLoop($app, store, App);
})

