import { bootstrap } from '@/app/bootstrap';
import { dbService } from '@/modules/database/services/sqlite.service';

async function initApp() {
  try {
    await dbService.init();
    bootstrap().mount('#app');
  } catch (error) {
    console.error('Failed to initialize app', error);
    document.body.innerHTML = '<div style="color: red; padding: 20px;">Failed to initialize database. Please make sure your browser supports OPFS.</div>';
  }
}

initApp();
