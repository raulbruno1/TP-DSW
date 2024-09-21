import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { DialogService } from 'src/app/services/dialog.service';
import { UserdataService } from 'src/app/services/userdata.service';

export const isAdminGuard: CanActivateFn = (route, state) => {
  const user_admin = inject(UserdataService);
  const dialogService = inject(DialogService);
  const router = inject(Router);


  if (user_admin.isAdmin) {
    return true;
} else {
dialogService.openFailureDialog('No tiene los permisos necesarios para acceder').afterClosed().subscribe(() => {
  window.location.href = '/';
});
return false;
}
};
