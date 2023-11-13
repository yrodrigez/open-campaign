import {Store} from 'cx/data';
import {Controller, KeySelection} from 'cx/ui';
import {startAppLoop} from "./startAppLoop";
import {Grid, Section, TextField, Button} from "cx/widgets";
import {applyThemeOverrides} from "cx-theme-space-blue";
import {render} from "@react-email/render";
import "./index.scss";
import axios from "axios";

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

    if (!this.store.get('emails')) {
      const renders = components.map(({name, component: Email}) => {
        return {
          name,
          html: render(<Email/>)
        }
      })
      this.store.init('emails', renders)
    }

    this.addTrigger('emailSelection', ['$page.selection'], (selection) => {
      const {html} = this.store.get('emails').find(c => c.name === selection)
      this.store.set('$page.email', html);
    }, true);
  }
}

const App = () => (
  <cx>
    <main controller={PageController}
          className="flex-1 flex items-center justify-evenly text-gray-700 font-bold tracking-wide leading-loose gap-2 py-3">
      <Section mod="well">
        <TextField value-bind="$page.to" placeholder="Email to?"/>
        <Grid
          records-bind="$page.records"
          style={{width: "100%"}}
          selection={{type: KeySelection, bind: '$page.selection', keyField: 'name'}}
          columns={[
            {field: 'name', header: 'Name'}
          ]}
        />
      </Section>
      <Section mod="well" class="h-full relative">
        <iframe
          className="w-[800px] h-full"
          srcDoc-bind="$page.email"
        />
        <div className="absolute top-2 right-2 z-50">
          <div className="flex flex-row gap-2">
            <Button

              mod="primary"
              onClick={async (e, {store}) => {
                const html = store.get('$page.email')
                const to = (store.get('$page.to') || '').split(',')
                if (!to || !to.length) return alert('Please enter a valid email address')
                await axios.post('http://localhost:3000/api/send-email', {html, to})
              }}
              enabled-expr="{$page.to} && {$page.to.length}"
            >
              Send proof
            </Button>
            <Button
              mod="primary"
              onClick={
                (e, {store}) => {
                  navigator.clipboard.writeText(store.get('$page.email'));
                }
              }>
              Copy HTML
            </Button>
          </div>
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

