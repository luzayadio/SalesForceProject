public with sharing class AccountController {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts(String accountId) {
        return [SELECT Id, Name, Salutation, Email, Phone FROM Contact WHERE
        AccountId = :accountId];
    }
}