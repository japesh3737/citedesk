import {defineConfig} from '@playwright/test';
export default defineConfig({testDir:'tests/browser',use:{baseURL:'http://localhost:4100'},webServer:{command:'npm start',url:'http://localhost:4100',reuseExistingServer:false,env:{DATA_DIR:'./data-e2e',PORT:'4100',PUBLIC_BASE_URL:'http://localhost:4100'}},projects:[{name:'desktop',use:{viewport:{width:1440,height:1000}}},{name:'mobile',use:{viewport:{width:375,height:812}}}]});


