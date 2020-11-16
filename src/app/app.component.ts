import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SmsServiceService } from './sms-service.service';
import {  NotifierService } from "angular-notifier";
import { SearchCountryField, TooltipLabel, CountryISO } from 'ngx-intl-tel-input';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private notifier: NotifierService;
  separateDialCode = true;
	SearchCountryField = SearchCountryField;
	TooltipLabel = TooltipLabel;
	CountryISO = CountryISO;
	preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];
	phoneForm = new FormGroup({
		phone: new FormControl(undefined, [Validators.required])
	});

	
  constructor(private fb: FormBuilder,private smsservice:SmsServiceService,private notifierService: NotifierService) {
this.notifier=this.notifierService;

   }

  smsData=this.fb.group({
    TophoneNo :[''],
  Message:['']
  });
  title = 'TwilioFrontend';
  onSubmit() {
   // TODO: Use EventEmitter with form value
    console.warn(this.smsData.value);
    this.smsservice.sendSMS(this.smsData.value)
    .subscribe((response) => {
      if (response.statusCode === 200) {
        this.notifier.show({
          type: "success",
          message: "SMS Send Successfully!!!",
          id: "THAT_NOTIFICATION_ID" // Again, this is optional
      });
    }
      else {
        this.notifier.notify('error', response.message);
  }
});
}
}
