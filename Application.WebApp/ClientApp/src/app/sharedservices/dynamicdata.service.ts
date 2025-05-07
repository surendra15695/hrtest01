import { Injectable } from '@angular/core';
import { TreeviewItem } from 'ngx-treeview';

export class DynamicDataService {
    getBooks(): TreeviewItem[] {
        const itCategory = new TreeviewItem({
            text: 'IT', value: 9, children: [
              {
                text: 'Programming', value: 91, children: [{
                  text: 'Frontend', value: 911, children: [
                    { text: 'Angular 1', value: 9111 },
                    { text: 'Angular 2', value: 9112 },
                    { text: 'ReactJS', value: 9113, disabled: true }
                  ]
                }, {
                  text: 'Backend', value: 912, children: [
                    { text: 'C#', value: 9121 },
                    { text: 'Java', value: 9122 },
                    { text: 'Python', value: 9123, checked: false, disabled: true }
                  ]
                }]
              },
              {
                text: 'Networking', value: 92, children: [
                  { text: 'Internet', value: 921 },
                  { text: 'Security', value: 922 }
                ]
              }
            ]
          });
        return [itCategory];
    }
}