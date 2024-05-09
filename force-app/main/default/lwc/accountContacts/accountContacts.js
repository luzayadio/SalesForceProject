import { LightningElement, api, wire, track } from 'lwc';

import getAccountContacts from "@salesforce/apex/AccountController.getContacts";

const columns = [
    { label: 'Name', fieldName: 'Name', type: 'text' },
    { label: 'Phone', fieldName: 'Phone', type: "phone"},
    { label: 'Email', fieldName: 'Email', type: 'email'}
];

export default class AccountContacts extends LightningElement {
    @api recordId; //to get the current Account ID in the record page
    @track columns = columns;
    @wire(getAccountContacts, {accountId: '$recordId'}) contacts;
}