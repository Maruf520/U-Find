import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IconService } from 'src/app/shared-services/utilities/icon.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  modalRef: any;
  file: File;
  formGroup: FormGroup;
  formData: FormData = new FormData();
  fileReader: FileReader = new FileReader();
  fileName: string;
  imageUrl: any;

  @ViewChild('upload') fileInput: ElementRef;

  constructor (private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formGroup = this.createForm();
  }

  createForm() {
    return this.formBuilder.group({
      phone: ['', Validators.required],
      location: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  async onUpload() {
    const file = this.fileInput.nativeElement;

    file.onchange = () => {
      this.setFileToUpload(file);
    };
    file.click();
  }

  setFileToUpload(file: any) {
    this.file = file.files[0];

    this.formData.set('image', file.files[0]);
    this.fileReader.readAsDataURL(file.files[0]);

    this.fileReader.onload = () => {
      this.imageUrl = this.fileReader.result;
      this.fileName = this.file.name;
    };
  }

  onSubmit() {
    if (!this.formGroup.valid) {
      return;
    }

    const result = Object.assign({}, this.formGroup.value);

    this.formData.set('phone', result.phone);
    this.formData.set('location', result.location);
    this.formData.set('descriptiom', result.description);
    this.formData.set('policeid', null);
    this.formData.set('personid', null);
  }
}
