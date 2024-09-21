import { ChangeDetectorRef, Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { DialogService } from 'src/app/services/dialog.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

export const LoginGuard: CanActivateFn = (route, state) => {
  const auth_token = inject(TokenStorageService);
  const dialogService = inject(DialogService);
  const router = inject(Router);


  if (!auth_token.getToken()) {
    return true;
  } else {
    dialogService.openFailureDialog('Ya se encuentra logueado').afterClosed().subscribe(() => {
      window.location.href = '/';
    });

    return false;
  }
};