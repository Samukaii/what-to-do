import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ButtonAction } from "../../button/types/button-action";
import { ButtonActionModule } from "../../button/button-action.module";
import { MatCardModule } from "@angular/material/card";
import { MatDialogModule } from "@angular/material/dialog";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule, CommonModule, ButtonActionModule, MatCardModule, MatDialogModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent {
  @Input() principalTitle: string | undefined;
  @Input() actions: ButtonAction[] = [];
}
