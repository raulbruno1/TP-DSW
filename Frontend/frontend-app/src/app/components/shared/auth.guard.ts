import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { DialogService } from 'src/app/services/dialog.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

export const authGuard: CanActivateFn = (route, state) => {
  const auth_token = inject(TokenStorageService);
  const dialogService = inject(DialogService);
  const router = inject(Router);

  if (auth_token.getToken()) {
        return true;
  } else {
    dialogService.openFailureDialog('Debe iniciar sesión primero').afterClosed().subscribe(() => {
      router.navigate(['/login']);
    });
    return false;
  }
};