import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { IRoleMenu } from '../../../interfaces/common/menu.interface';
import { NotificationService } from '../../../sharedservices/notification.service';
import { UserService } from 'src/app/services/common/user/user.service';
import { TreeviewItem, TreeviewConfig } from 'ngx-treeview';
import { DynamicDataService } from '../../../sharedservices/dynamicdata.service';
import { CommonService } from 'src/app/services/common/common/common.service';
import { AppRoutingModule } from 'src/app/layouts/masterlayout/routing';
import { PersistanceService } from 'src/app/sharedservices/persitence.service';
import { element } from 'protractor';

declare var jQuery: any;

@Component({
  selector: 'app-menu-access',
  templateUrl: './menu-access.component.html',
  styleUrls: ['./menu-access.component.css'],
  providers: [DynamicDataService]
})

export class MenuAccessComponent implements OnInit {
  items: TreeviewItem[];
  allitems: TreeviewItem[];
  values: number[];
  RoleList: any[] = [];
  MenuList: any[] = [];
  FinalMenu: any[] = [];
  SelMenu: string;

  SelUserRole: number;
  createdBy: number;
  data: any = {};
  config = TreeviewConfig.create({
    hasAllCheckBox: true,
    hasFilter: true,
    hasCollapseExpand: true,
    decoupleChildFromParent: false,
    maxHeight: 400
  });

  saveForm = new FormGroup({
    Name: new FormControl('')
  });

  rolemenus: IRoleMenu[] = [];
  searchUserRole = {
    AutoUserId: null,
    isActive: true
  }

  constructor(
    private userService: UserService,
    private spinnerService: NgxSpinnerService,
    private notiService: NotificationService,
    private fb: FormBuilder,
    private persistance: PersistanceService,
    private dynamicService: DynamicDataService,
    private commonService: CommonService,
  ) {
    this.createdBy = this.persistance.get('loggedinuser').autoUserId;
    this.searchUserRole.AutoUserId = this.createdBy;
  }

  ngOnInit() {
    //this.createForm();           
    this.getAllUserRole();
    //this.getAllMenuAccess(this.data);  
    // this.getBooks();
  }
  getBooks() {
    this.items = this.dynamicService.getBooks();
  }

  createForm() {
    this.saveForm = this.fb.group({
      RoleId: [null, Validators.required],
      MenuID: [TreeviewItem],
      IsActive: [true],
      CreatedBy: [0]
    })
  }

  onSubmit() {
    this.spinnerService.show();
    this.rolemenus = [];
    // Added by Anif on 07-07-2022
    if (this.SelMenu.length > 0) {
      for (var i = 0; i < this.SelMenu.length; i++) {
        this.rolemenus.push({
          RoleId: Number(this.SelUserRole),
          ModuleId: Number(this.SelMenu[i])
        })
      }
    } else {
      this.rolemenus.push({
        RoleId: Number(this.SelUserRole),
        ModuleId: 0
      })
    }
    const formData = new FormData();
    formData.append("MenuAccessInsert", JSON.stringify(this.rolemenus));
    formData.append("CreatedBy", this.createdBy.toString());
    this.commonService.addMenuAccess(formData).subscribe((response: any) => {
      if (response.successFlag == 1) {
        this.notiService.showSuccess(response.msg, "Success");
        // this.createForm(); // Previous
        this.getRoleWiseMenu(this.data);
      }
      else {
        this.notiService.showError(response.msg, "Error");
      }
    }, error => {
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
      this.spinnerService.hide();
    }, () => {
      this.spinnerService.hide();
    })
  }

  onChangeUserRole(userRoleID: any) {
    this.SelUserRole = userRoleID;
    this.data = {
      'RoleId': this.SelUserRole
    }
    this.getRoleWiseMenu(this.data);
  }

  onSelectedChange(event: any) {
    this.SelMenu = event;
  }

  getAllUserRole() {
    this.spinnerService.show();
    this.commonService.getAllUserRole(this.searchUserRole).subscribe((response: any) => {
      if (response.length != 0) {
        this.RoleList = response;
        //console.log("Role List: ", this.RoleList);
        this.spinnerService.hide();
      }
      else {
        this.RoleList = [];
        this.spinnerService.hide();
      }
    }, error => {
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
      this.spinnerService.hide();
    })
  }

  getRoleWiseMenu(data: any) {
    // alert("HI");
    // console.log("Console Hi");
    this.spinnerService.show();
    this.allitems = [];
    var dataitems = [];
    var parentitems = [];
    var childArray = [];
    this.commonService.getAllRoleMenuAccess(data).subscribe((response: any) => {
      if (response.length != 0) {
        this.MenuList = response;
        for (var i = 0; i < this.MenuList.length; i++) {
          if (this.MenuList[i].parentModID != 0) {
            // All menu
            var obj = new TreeviewItem({
              text: this.MenuList[i].moduleName,
              value: this.MenuList[i].parentModID,
              //children: [],
              checked: this.MenuList[i].isCheck
            })
            dataitems.push(obj);
          } else {
            // Parent Menu where ParentModeId==0
            var childData = this.MenuList.filter(x => x.parentModID == this.MenuList[i].moduleId);
            if (childData.length > 0) {
              childData.forEach(chd_element => {
                var childObj = {
                  text: chd_element.moduleName,
                  value: chd_element.moduleId,
                  checked: chd_element.isCheck
                }
                childArray.push(childObj)
              })
            }
            var obj = new TreeviewItem({
              text: this.MenuList[i].moduleName,
              value: this.MenuList[i].moduleId,
              children: childArray,
              checked: this.MenuList[i].isCheck
            })
            parentitems.push(obj);
            childArray = [];
          }
        }
        this.items = parentitems;

      } // checkd end for response length>0

      // parentitems = dataitems.filter(x => x.parentModID == 0);
      // for (var j = 0; j < parentitems.length; j++) {
      //   parentitems[j].children = dataitems.filter(x => x.parentModID == parentitems[j].value);
      // }
      // this.items = parentitems;


      // console.log("Items", this.items);
    }, error => {
      this.notiService.showError("Something went wrong.. Try again later..", "");
      console.log(error);
    }, () => {
      this.spinnerService.hide();
    })
  }

  getAllMenuAccessByRole(data: any) {
    this.spinnerService.show();
    this.commonService.getAllRoleMenuAccess(data).subscribe((response: any) => {
      if (response.length != 0) {
        this.MenuList = response;
        let Arr: any[] = [];
        let Menu: any[] = [];
        for (let item of this.MenuList) {
          if (item.moduleLEvel == 1) {
            let obj: any = {
              'text': item.moduleName,
              'value': item.moduleId,
              'children': []
            }
            Arr.push(obj);
          }
        }

        Menu = Arr;
        Arr = [];
        var childcount = 0;
        var checkedchildcount = 0;
        let TempArr: any[] = [];
        for (let parent of Menu) {
          for (let item of this.MenuList) {
            if (parent.value == item.parentModID) {
              let obj: any = {
                'text': item.moduleName,
                'value': item.moduleId,
                'children': [],
                'checked': item.isCheck
              }
              if (item.isCheck == true) {
                checkedchildcount = checkedchildcount + 1;
              }
              childcount = childcount + 1;
              Arr.push(obj);
            }
          }
          // if (childcount > 0) {
          //   if (childcount == checkedchildcount) {
          //     let obj2: any = {
          //       'text': parent.text,
          //       'value': parent.value,
          //       'children': Arr,
          //       'checked': true
          //     }
          //     TempArr.push(obj2);
          //   }
          //   else {
          //     let obj2: any = {
          //       'text': parent.text,
          //       'value': parent.value,
          //       'children': Arr,
          //       'checked': false
          //     }
          //     TempArr.push(obj2);
          //   }
          // }
          // else{
          //   let obj2: any = {
          //     'text': parent.text,
          //     'value': parent.value,
          //     'children': Arr,
          //     'checked': parent.isCheck
          //   }
          //   TempArr.push(obj2);
          // }
          let obj2: any = {
            'text': parent.text,
            'value': parent.value,
            'children': Arr,
            'checked': parent.isCheck
          }
          TempArr.push(obj2);
          Arr = [];
          childcount = 0;
          checkedchildcount = 0;
        }

        this.FinalMenu = TempArr;
        this.items = this.getMenu(this.FinalMenu);
      }
      else {
        this.MenuList = [];
      }
    }, error => {
      this.notiService.showError("Something went wrong.. Try again later..", "");
      console.log(error);
    }, () => {
      this.spinnerService.hide();
    })
  }

  getAllMenuAccess(data: any) {
    this.spinnerService.show();
    this.commonService.getAllRoleMenuAccess(data).subscribe((response: any) => {
      if (response.length != 0) {
        this.MenuList = response;
        //console.log("Menu List: ", this.MenuList);

        let Arr: any[] = [];
        let Menu: any[] = [];
        for (let item of this.MenuList) {
          if (item.moduleLEvel == 1) {
            let obj: any = {
              'text': item.moduleName,
              'value': item.moduleId,
              'children': []
            }

            Arr.push(obj);
          }
        }

        Menu = Arr;
        Arr = [];
        let TempArr: any[] = [];
        for (let parent of Menu) {
          for (let item of this.MenuList) {
            if (parent.value == item.parentModID) {
              let obj: any = {
                'text': item.moduleName,
                'value': item.moduleId,
                'children': [],
                'checked': false
              }

              Arr.push(obj);
            }
          }

          let obj2: any = {
            'text': parent.text,
            'value': parent.value,
            'children': Arr,
            'checked': false
          }

          TempArr.push(obj2);
          Arr = [];
        }

        this.FinalMenu = TempArr;
        this.items = this.getMenu(this.FinalMenu);
      }
      else {
        this.MenuList = [];
      }
    }, error => {
      this.notiService.showError("Something went wrong.. Try again later..", "");
      console.log(error);
    }, () => {
      this.spinnerService.hide();
    })
  }

  getMenu(menu: any[]): TreeviewItem[] {
    const itCategory = new TreeviewItem({
      text: 'Menu', value: 9, children: menu
    });

    return [itCategory];
  }
}