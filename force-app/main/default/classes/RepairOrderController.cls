public with sharing class RepairOrderController {
    @AuraEnabled(cacheable=true)
    public static List<Repair_order_Technician__c> getTechnical(String repairOrderId) {
        return [SELECT Id, Name, Technician__c FROM Repair_order_Technician__c WHERE
        Repair_Order__c = :repairOrderId];
    }
}