/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {Component, ViewChild} from "@angular/core";
import {ClarityModule} from "../clarity.module";
import {Alert} from "./alert";

@Component({
    template: `
        <clr-alert
            [clrAlertType]="type"
            [clrAlertSizeSmall]="isSmall"
            [clrAlertClosable]="isClosable"
            [(clrAlertClosed)]="closed"
            [clrAlertAppLevel]="isAppLevel">
            <div class="alert-item">
                <span class="alert-text">
                This is an alert!
                </span>
            </div>
        </clr-alert>
   `
})
class TestComponent {
    @ViewChild(Alert) alertInstance: Alert;

    type: string = "";
    isSmall: boolean = false;
    isClosable: boolean = false;
    closed: boolean = false;
    isAppLevel: boolean = false;
}

describe("Alert", () => {
    let fixture: ComponentFixture<any>;
    let compiled: any;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ClarityModule],
            declarations: [TestComponent]
        });

        fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();
        compiled = fixture.nativeElement;
    });

    afterEach(() => {
        fixture.destroy();
    });

    it("projects content", () => {
        expect(compiled.textContent).toMatch(/This is an alert!/);
    });

    it("Extends the alert-sm class when clrAlertSizeSmall is set to true", () => {
        expect(compiled.querySelector(".alert-sm")).toBeNull();

        fixture.componentInstance.isSmall = true;
        fixture.detectChanges();
        expect(compiled.querySelector(".alert-sm")).not.toBeNull();

    });

    it("supports a clrAlertClosable option", () => {
        fixture.componentInstance.isClosable = false;
        fixture.detectChanges();
        expect(compiled.querySelector(".close")).toBeNull();

        fixture.componentInstance.isClosable = true;
        fixture.detectChanges();
        expect(compiled.querySelector(".close")).not.toBeNull();
    });

    it("extends the alert type classes when clrAlertType is set", () => {
        //default alert-info class
        expect(compiled.querySelector(".alert-info")).not.toBeNull();

        //set alert-danger
        fixture.componentInstance.type = "alert-danger";
        fixture.detectChanges();

        expect(compiled.querySelector(".alert-info")).toBeNull();
        expect(compiled.querySelector(".alert-danger")).not.toBeNull();

        //set alert-warning
        fixture.componentInstance.type = "alert-warning";
        fixture.detectChanges();

        expect(compiled.querySelector(".alert-danger")).toBeNull();
        expect(compiled.querySelector(".alert-warning")).not.toBeNull();

        //set alert-success
        fixture.componentInstance.type = "alert-success";
        fixture.detectChanges();

        expect(compiled.querySelector(".alert-warning")).toBeNull();
        expect(compiled.querySelector(".alert-success")).not.toBeNull();
    });

    it("Removes the alert from the DOM when closed", () => {
        let instance: Alert = fixture.componentInstance.alertInstance;

        expect(compiled.querySelector(".alert")).not.toBeNull();
        fixture.componentInstance.isClosable = true;
        fixture.detectChanges();

        instance.close();
        fixture.detectChanges();
        expect(compiled.querySelector(".alert")).toBeNull();
    });

    it("shows and hides the alert based on the clrAlertClosed input", () => {
        expect(compiled.querySelector(".alert")).not.toBeNull();
        fixture.componentInstance.closed = true;
        fixture.detectChanges();
        expect(compiled.querySelector(".alert")).toBeNull();
        fixture.componentInstance.closed = false;
        fixture.detectChanges();
        expect(compiled.querySelector(".alert")).not.toBeNull();
    });

    it("supports a clrAlertAppLevel option", () => {
        fixture.componentInstance.isAppLevel = false;
        fixture.detectChanges();
        expect(compiled.querySelector(".alert-app-level")).toBeNull();

        fixture.componentInstance.isAppLevel = true;
        fixture.detectChanges();
        expect(compiled.querySelector(".alert-app-level")).not.toBeNull();
    });
});
