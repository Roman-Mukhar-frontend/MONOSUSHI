import { NgModule } from '@angular/core'

import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';

const MATERIAL = [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule
]

// other modules

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [],
    imports: [
        ...MATERIAL,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule
    ],
    exports: [
        ...MATERIAL,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule
    ]
})

export class SharedModule {  }
