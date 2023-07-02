import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { ControlContainer, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextareaComponent {
  @Input({ required: true }) name!: string;
  @Input() label?: string;
  @Input() placeholder?: string;
  @Input() hint?: string;
  @Input() icon?: string;

  container = inject(ControlContainer);
  form!: FormGroup;

  ngOnInit(){
    this.form = this.container.control as FormGroup;
  }
}
