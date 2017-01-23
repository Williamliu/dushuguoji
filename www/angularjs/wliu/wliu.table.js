var wliu_table = angular.module("wliuTable",[]);

wliu_table.directive("table.navi", function () {
    return {
        restrict: "E",
        replace: true,
        scope: {
            table:      "=",
            tooltip:    "@"
        },
        template: [
                    '<div class="row" style="padding:0px; margin:5px;" ng-show="table.navi.paging==1">',
                        '<div class="col-md-12" ng-if="table.navi.paging">',
                        '<div class="pull-left" style="padding:0px; margin:0px; white-space:nowrap;">',
                            '<span style="vertical-align:middle;">Page: </span>',                           
                            '<input type="text" class="input-tiny" style="height:1.2em;width:30px;font-size:1.2em;text-align:center;" ng-model="table.navi.pageno" ',
                                'ng-keypress="keypress($event)" ',
                                'wliu-popup popup-target="{{tooltip?table.tooltip:\'\'}}" popup-toggle="hover" popup-content="Page Number" ',
                                'title="{{tooltip? \'\':\'Page Number\'}}" ',
                            '/>',
                            '<span style="vertical-align:middle;font-size:1.2em;font-weight:bold"> / </span>',                           
                            '<span style="vertical-align:middle;font-size:1.2em;">{{ table.navi.pagetotal }}</span>',                           
                            '<span style="vertical-align:middle;font-size:1.2em;"> | </span>',                           
                            '<a class="wliu-btn24 wliu-btn24-first"     ng-class="{\'wliu-btn24-first-disabled\':(!table.navi.pageno || !table.navi.pagetotal || table.navi.pageno<=1 || table.navi.pagetotal<=0)}" ',
                                'ng-click="table.firstPage()" ',
                                'wliu-popup popup-target="{{tooltip?table.tooltip:\'\'}}" popup-toggle="hover" popup-content="First Page" ',
                                'title="{{tooltip? \'\':\'First Page\'}}" ',
                            '>',
                            '</a>',
                            '<a class="wliu-btn24 wliu-btn24-previous"  ng-class="{\'wliu-btn24-previous-disabled\':(!table.navi.pageno || !table.navi.pagetotal || table.navi.pageno<=1 || table.navi.pagetotal<=0)}" ',
                                'ng-click="table.previousPage()" ',
                                'wliu-popup popup-target="{{tooltip?table.tooltip:\'\'}}" popup-toggle="hover" popup-content="Previous Page" ',
                                'title="{{tooltip? \'\':\'Previous Page\'}}" ',
                            '>',
                            '</a>',
                            '<a class="wliu-btn24 wliu-btn24-next"      ng-class="{\'wliu-btn24-next-disabled\':(!table.navi.pageno || !table.navi.pagetotal || table.navi.pageno>=table.navi.pagetotal || table.navi.pagetotal<=0)}" ',
                                'ng-click="table.nextPage()" ',
                                'wliu-popup popup-target="{{tooltip?table.tooltip:\'\'}}" popup-toggle="hover" popup-content="Next Page" ',
                                'title="{{tooltip? \'\':\'Next Page\'}}" ',
                            '>',
                            '</a>',
                            '<a class="wliu-btn24 wliu-btn24-last"      ng-class="{\'wliu-btn24-last-disabled\':(!table.navi.pageno || !table.navi.pagetotal || table.navi.pageno>=table.navi.pagetotal || table.navi.pagetotal<=0)}" ',
                                'ng-click="table.lastPage()" ',
                                'wliu-popup popup-target="{{tooltip?table.tooltip:\'\'}}" popup-toggle="hover" popup-content="Last Page" ',
                                'title="{{tooltip? \'\':\'Last Page\'}}" ',
                            '>',
                            '</a>',
                            '<span style="vertical-align:middle;font-size:1.2em;"> | </span>',                           
                            '<a class="wliu-btn24 wliu-btn24-reload" ',
                                'ng-hide="table.navi.loading==1" ',
                                'ng-click="table.getRows()" ',
                                'wliu-popup popup-target="{{tooltip?table.tooltip:\'\'}}" popup-toggle="hover" popup-content="Reload Data" ',
                                'title="{{tooltip? \'\':\'Reload Data\'}}" ',
                            '></a>',
                            '<i class="fa fa-spinner fa-lg fa-pulse fa-fw" aria-hidden="true" ng-show="table.navi.loading==1"></i>',
                            '<span style="vertical-align:middle;font-size:1.2em;"> | </span>',                           
                            '<span style="vertical-align:middle; white-space:nowrap;">Total: ',
                            '<span style="vertical-align:middle;" ng-bind="table.navi.recordtotal"></span>',
                            '</span>',
                        '</div>',
                        '<div class="pull-right" style="padding:0px; margin:0px;" ng-if="table.navi.pagetotal>0 || table.navi.recordtotal>0">',
                            '<span style="vertical-align:middle;">Size: </span>',                           
                            '<input type="text" class="input-tiny" style="height:1.2em;width:30px;font-size:1.2em;text-align:center;" ng-model="table.navi.pagesize" ',
                                'ng-keypress="keypress($event)" ',                                
                                'wliu-popup popup-target="{{tooltip?table.tooltip:\'\'}}" popup-toggle="hover" popup-content="Page Size" ',
                                'title="{{tooltip? \'\':\'Page Size\'}}" ',
                            '/>',
                            '<a class="wliu-btn24 wliu-btn24-reload" ',
                                'ng-hide="table.navi.loading==1" ',
                                'ng-click="table.getRows()" ',
                                'wliu-popup popup-target="{{tooltip?table.tooltip:\'\'}}" popup-toggle="hover" popup-content="Reload Data" ',
                                'title="{{tooltip? \'\':\'Reload Data\'}}" ',
                            '></a>',
                            '<i class="fa fa-spinner fa-lg fa-pulse fa-fw" aria-hidden="true" ng-show="table.navi.loading==1"></i>',
                            '<table.order table="table" style="margin-right:10px" xsize="24" ',
                                'wliu-popup popup-target="{{tooltip?table.tooltip:\'\'}}" popup-toggle="hover" popup-content="Sort By" ',
                                'title="{{tooltip? \'\':\'Sort By\'}}" ',
                            '><table.order>',
                        '</div>',
                        '</div>',
                    '</div>'    
                ].join(''),
        controller: function ($scope) {
            $scope.keypress = function(ev) {
                if(ev.keyCode==13) {
                    $scope.table.getRows();
                } 
            }
        },
        link: function (sc, el, attr) {
        }
    }
});

wliu_table.directive("table.navi1", function () {
    return {
        restrict: "E",
        replace: true,
        scope: {
            table:      "=",
            tooltip:    "@"
        },
        template: [
                    '<div style="display:block; position:relative; padding:0px; margin:5px;" ng-show="table.navi.paging==1">',
                        '<div style="padding:0px; margin:0px; white-space:nowrap;">',
                            '<a class="wliu-btn16 wliu-btn16-reload" ',
                                'ng-hide="table.navi.loading==1" ',
                                'ng-click="table.getRows()" ',
                                'title="Reload Data" ',
                            '></a>',
                            '<i class="fa fa-spinner fa-pulse fa-fw" aria-hidden="true" ng-show="table.navi.loading==1"></i>',
                            '<span style="vertical-align:middle;font-size:1em;"> | </span>',                           
                            '<a class="wliu-btn16 wliu-btn16-first"     ng-class="{\'wliu-btn16-first-disabled\':(!table.navi.pageno || !table.navi.pagetotal || table.navi.pageno<=1 || table.navi.pagetotal<=0)}" ',
                                'ng-click="table.firstPage()" ',
                                'title="First Page"',
                            '></a>',
                            '<a class="wliu-btn16 wliu-btn16-previous"  ng-class="{\'wliu-btn16-previous-disabled\':(!table.navi.pageno || !table.navi.pagetotal || table.navi.pageno<=1 || table.navi.pagetotal<=0)}" ',
                                'ng-click="table.previousPage()" ',
                                'title="Previous Page"',
                            '></a>',
                            '<a class="wliu-btn16 wliu-btn16-next"      ng-class="{\'wliu-btn16-next-disabled\':(!table.navi.pageno || !table.navi.pagetotal || table.navi.pageno>=table.navi.pagetotal || table.navi.pagetotal<=0)}" ',
                                'ng-click="table.nextPage()" ',
                                'title="Next Page"',
                            '></a>',
                            '<a class="wliu-btn16 wliu-btn16-last"      ng-class="{\'wliu-btn16-last-disabled\':(!table.navi.pageno || !table.navi.pagetotal || table.navi.pageno>=table.navi.pagetotal || table.navi.pagetotal<=0)}" ',
                                'ng-click="table.lastPage()" ',
                                'title="Last Page"',
                            '></a>',
                            '<span style="vertical-align:middle;font-size:1em;"> | </span>',                           
                            '<input type="text" class="input-tiny" style="height:1em;width:40px;font-size:1em;text-align:center;" ng-model="table.navi.pageno" ',
                                'ng-keypress="keypress($event)" ',
                                'title="Page Number"',
                            '/>',
                            '<span style="vertical-align:middle;font-size:1em;font-weight:bold">/</span>',                           
                            '<span style="vertical-align:middle;font-size:1em;">{{ table.navi.pagetotal }}</span>',                           
                            '<span style="vertical-align:middle;font-size:1em;"> | </span>',                           
                            '<input type="text" class="input-tiny" style="height:1em;width:30px;font-size:1em;text-align:center;" ng-model="table.navi.pagesize" ',
                                'ng-keypress="keypress($event)" ',                                
                                'title="Page Size"',
                            '/>',
                        '</div>',
                    '</div>'    
                ].join(''),
        controller: function ($scope) {
            $scope.keypress = function(ev) {
                console.log("here");
                if(ev.keyCode==13) {
                    $scope.table.getRows();
                } 
            }
        },
        link: function (sc, el, attr) {
        }
    }
});

wliu_table.directive("table.order", function(){
    return {
        restrict: "E",
        replace: true,
        scope: {
            table:      "=",
            xsize:      "@"
        },
        template: [
                    '<a class="wliu-btn{{xsize}} wliu-btn{{xsize}}-order">',
                        '<div class="wliu-selectlist" style="right:0px;left:auto;">',
                            '<div class="wliu-selectlist-title info-color text-center">ORDER</div>',
                            '<ul class="wliu-selectlist-content" ng-repeat="colMeta in table.cols" ng-if="colMeta.sort" style="color:#333333;">',
                                '<li class="wliu-orderlist" ',
                                    'ng-class="{\'wliu-orderlist-active\':colMeta.name==table.navi.orderby && table.navi.sortby.toLowerCase()==\'asc\'}" ',
                                    'ng-click="changeOrder(colMeta.name, \'ASC\')"',
                                '>',
                                    '{{ colMeta.colname }} <i class="fa fa-sort-asc" style="vertical-align:bottom;"></i>',
                                '</li>',
                                '<li class="wliu-orderlist" ',
                                    'ng-class="{\'wliu-orderlist-active\':colMeta.name==table.navi.orderby && table.navi.sortby.toLowerCase()==\'desc\'}" ',
                                    'ng-click="changeOrder(colMeta.name, \'DESC\')"',
                                '>',
                                    '{{ colMeta.colname }} <i class="fa fa-sort-desc" style="vertical-align:top;"></i>',
                                '</li>',
                            '</ul>',
                        '</div>',
                    '</a>'    
                ].join(''),
        controller: function ($scope) {
            $scope.xsize = $scope.xsize?$scope.xsize:24;
            $scope.changeOrder=function(name, order) {
                $scope.table.navi.orderby=name;
                $scope.table.navi.sortby=order;
                $scope.table.getRows();
            }
        },
        link: function (sc, el, attr) {
        }
    }
});

wliu_table.directive("table.rowstatus", function () {
    return {
        restrict: "E",
        replace: true,
        scope: {
            table:      "=",
            rowsn:      "@"
        },
        template: [
                    '<span class="wliu-text" scope="{{ table.scope }}" style="vertical-align:middle;padding:0px;" ',
                        'ng-disabled="table.rowByIndex(rowsn)==undefined" ',
                    '>',
                        //'{{table.rowByIndex(rowsn).rowstate}}-',
                        '<a class="wliu-btn16 wliu-btn16-rowstate-save"     ng-if="table.rowByIndex(rowsn).error.errorCode==0 && table.rowByIndex(rowsn).rowstate==1"   title="Changed"></a>',
                        '<a class="wliu-btn16 wliu-btn16-rowstate-add"      ng-if="table.rowByIndex(rowsn).error.errorCode==0 && table.rowByIndex(rowsn).rowstate==2"   title="New"></a>',
                        '<a class="wliu-btn16 wliu-btn16-rowstate-delete"   ng-if="table.rowByIndex(rowsn).error.errorCode==0 && table.rowByIndex(rowsn).rowstate==3"   title="Deleted"></a>',
                        ' <span title="Series Number" style="vertical-align:middle;">{{ (rowsn-0) + 1 }} / {{table.rows.length}}</span>',
                    '</span>'
                ].join(''),
        controller: function ($scope) {
        },
        link: function (sc, el, attr) {
        }
    }
});

wliu_table.directive("table.rowno", function () {
    return {
        restrict: "E",
        replace: true,
        scope: {
            table:      "=",
            rowsn:      "@",
            tooltip:    "@"
        },
        template: [
                    '<span class="wliu-text" scope="{{ table.scope }}" ',
                        'ng-disabled="table.rowByIndex(rowsn)==undefined" ',
                        'wliu-popup popup-target="{{tooltip?table.tooltip:\'\'}}" popup-toggle="hover" ',
                        'popup-content="{{table.rowByIndex(rowsn).error.errorCode?table.rowByIndex(rowsn).error.errorMessage.nl2br():\'\'}}"',
                        'title="{{ tooltip?\'\':(table.rowByIndex(rowsn).error.errorCode ? table.rowByIndex(rowsn).error.errorMessage : \'\') }}"',
                    '>',
                        //'{{table.rowByIndex(rowsn).rowstate}}-',
                        '<a class="wliu-btn16 wliu-btn16-rowstate-error"    ng-if="table.rowByIndex(rowsn).error.errorCode" ',
                            'title="{{ tooltip?\'\':(table.rowByIndex(rowsn).error.errorCode? table.rowByIndex(rowsn).error.errorMessage : \'\') }}"',
                        '>',
                        '</a>',
                        '<span ng-if="table.rowByIndex(rowsn).error.errorCode==0 && table.rowByIndex(rowsn).rowstate==0" title="Series Number">{{ (rowsn-0) + 1 }}</span>',
                        '<a class="wliu-btn16 wliu-btn16-rowstate-save"     ng-if="table.rowByIndex(rowsn).error.errorCode==0 && table.rowByIndex(rowsn).rowstate==1"   title="Changed"></a>',
                        '<a class="wliu-btn16 wliu-btn16-rowstate-add"      ng-if="table.rowByIndex(rowsn).error.errorCode==0 && table.rowByIndex(rowsn).rowstate==2"   title="New"></a>',
                        '<a class="wliu-btn16 wliu-btn16-rowstate-delete"   ng-if="table.rowByIndex(rowsn).error.errorCode==0 && table.rowByIndex(rowsn).rowstate==3"   title="Deleted"></a>',
                        //' - {{table.rowByIndex(rowsn).keys}}',
                    '</span>'
                ].join(''),
        controller: function ($scope) {
        },
        link: function (sc, el, attr) {
        }
    }
});

wliu_table.directive("table.ckeditor", function () {
    return {
        restrict: "E",
        replace: true,
        scope: {
            table:      "=",
            rowsn:      "@",
            name:       "@"
        },
        template: [
                    '<span ng-hide="table.relationHide(rowsn, name)">',
                        '<a class="wliu-btn16 wliu-btn16-rowstate-error" ng-if="table.colByIndex(rowsn, name).errorCode"></a>',
                        '<span style="color:red; vertical-align:middle;" ng-if="table.colByIndex(rowsn, name).errorCode">Error: {{table.colByIndex(rowsn, name).errorCode?table.colByIndex(rowsn, name).errorMessage:""}}</span>',
                        '<input type="hidden" ng-model="rowsn" ng-change="modelChange()" />',
                        '<textarea scope="{{ table.scope }}" ng-model="table.colByIndex(rowsn, name).value" id="{{table.scope}}_{{name}}"" ',
                                  'title="{{ table.rowByIndex(rowsn).error.errorCode ? table.rowByIndex(rowsn).error.errorMessage : \'\' }}"',
                        '>',
                        '</textarea>',
                    '</span>'
                ].join(''),
        controller: function ($scope) {
            //  model change ,  it will not sync to ckeditor
            //  only sync to ckeditor when initialize the model.
            $scope.modelChange = function() {
                if( $scope.table.colByIndex($scope.rowsn, $scope.name) )  {
                    if(CKEDITOR.instances[$scope.table.scope+"_"+$scope.name])
                        CKEDITOR.instances[$scope.table.scope+"_"+$scope.name].setData( $scope.table.colByIndex($scope.rowsn, $scope.name).value );
                }  else {
                    if(CKEDITOR.instances[$scope.table.scope+"_"+$scope.name])
                        CKEDITOR.instances[$scope.table.scope+"_"+$scope.name].setData("");
                }
            }
            $scope.$watch("rowsn", $scope.modelChange);
        },
        link: function (sc, el, attr) {
            $(function(){
                htmlObj_cn = CKEDITOR.replace(sc.table.scope + "_" + sc.name,{});
                // The "change" event is fired whenever a change is made in the editor.
                htmlObj_cn.on('change', function (evt) {
                    if( sc.table.colByIndex(sc.rowsn, sc.name) ) {
                        if( sc.table.colByIndex(sc.rowsn, sc.name).value != CKEDITOR.instances[sc.table.scope+"_"+sc.name].getData() ) {
                            sc.table.colByIndex(sc.rowsn, sc.name).value = CKEDITOR.instances[sc.table.scope+"_"+sc.name].getData();
                            sc.table.changeByIndex(sc.rowsn, sc.table.colByIndex(sc.rowsn, sc.name));
                            // to prevent diggest in progress in angular.
                            if( !sc.$root.$$phase) sc.$apply();
                            
                        }
                    }
                });
            });
        }
    }
});

wliu_table.directive("table.head", function () {
    return {
        restrict: "E",
        replace: true,
        scope: {
            table:      "=",
            name:       "@",
            tooltip:    "@"
        },
        template: [
                    '<label for="navi_{{table.scope}}_{{name}}" class="wliuCommon-label" scope="{{ table.scope }}" ',
                        'wliu-popup popup-target="{{tooltip?table.tooltip:\'\'}}" popup-toggle="hover" popup-content="{{table.colMeta(name).coldesc?table.colMeta(name).coldesc:table.colMeta(name).colname?table.colMeta(name).colname:name}}" ',
                        'title="{{tooltip? \'\':table.colMeta(name).coldesc?table.colMeta(name).coldesc:table.colMeta(name).colname?table.colMeta(name).colname:name}}" ',
                    '>',
                        '<span style="vertival-align:middle;">{{ table.colMeta(name).colname?table.colMeta(name).colname:name }}</span>',
                        '<span style="vertival-align:middle;" class="wliuCommon-text-error" ng-if="table.colMeta(name).notnull"> <b>*</b></span> ',
                        '<a id="navi_{{table.scope}}_{{name}}" ng-click="changeOrder()" class="wliu-btn16 wliu-btn16-sort" ng-if="table.colMeta(name).sort" ',
                                'ng-class="{\'wliu-btn16-sort-asc\':(name==table.navi.orderby && ( table.navi.sortby.toLowerCase()==\'asc\' || ( table.navi.sortby==\'\' && table.colMeta(name).sort.toLowerCase()==\'asc\'))) ',
                                ',\'wliu-btn16-sort-desc\':(name==table.navi.orderby && ( table.navi.sortby.toLowerCase()==\'desc\' || (table.navi.sortby==\'\' && table.colMeta(name).sort.toLowerCase()==\'desc\') )) }" title="Sort by {{table.colMeta(name).colname}}"',
                        '>',
                        '</a>',
                    '</label>'
                ].join(''),
        controller: function ($scope) {
            $scope.changeOrder=function() {
                if( $scope.table.navi.orderby.toLowerCase()==$scope.name.toLowerCase() ) {
                    if($scope.table.navi.sortby.toLowerCase()=="asc") {
                        $scope.table.navi.sortby = "DESC";
                    } else {
                        $scope.table.navi.sortby = "ASC";
                    }
                } else {
                    $scope.table.navi.orderby = $scope.name;
                    $scope.table.navi.sortby = $scope.table.colMeta($scope.name).sort?$scope.table.colMeta($scope.name).sort.toUpperCase():"ASC";
                }
                $scope.table.getRows();
            }
        },
        link: function (sc, el, attr) {
        }
    }
});

wliu_table.directive("table.label", function () {
    return {
        restrict: "E",
        replace: true,
        scope: {
            table:      "=",
            name:       "@",
            tooltip:    "@"
        },
        template: [
                    '<label class="wliuCommon-label" scope="{{ table.scope }}" ',
                        'wliu-popup popup-target="{{tooltip?table.tooltip:\'\'}}" popup-toggle="hover" popup-content="{{table.colMeta(name).coldesc?table.colMeta(name).coldesc:table.colMeta(name).colname?table.colMeta(name).colname:name}}" ',
                        'title="{{tooltip? \'\':table.colMeta(name).coldesc?table.colMeta(name).coldesc:table.colMeta(name).colname?table.colMeta(name).colname:name}}" ',
                    '>',
                        '<span style="vertival-align:middle;">{{ table.colMeta(name).colname?table.colMeta(name).colname:name }}</span>',
                        '<span style="vertival-align:middle;" class="wliuCommon-text-error" ng-if="table.colMeta(name).notnull"> <b>*</b></span>',
                    '</label>'
                ].join(''),
        controller: function ($scope) {
        },
        link: function (sc, el, attr) {
        }
    }
});

wliu_table.directive("table.html", function ($sce) {
    return {
        restrict: "E",
        replace: true,
        scope: {
            table:      "=",
            rowsn:      "@",
            name:       "@"
        },
        template: [
                    '<span scope="{{ table.scope }}" ng-bind-html="getHTML()" ng-hide="table.relationHide(rowsn, name)"></span>'
                ].join(''),
        controller: function ($scope, $sce) {
            $scope.getHTML = function() {
                if( $scope.table.colByIndex($scope.rowsn, $scope.name) )
                    return $sce.trustAsHtml($scope.table.colByIndex($scope.rowsn, $scope.name).value);
                else 
                    return $sce.trustAsHtml("");
            }
        },
        link: function (sc, el, attr) {
            $(function(){
            });
        }
    }
});

wliu_table.directive("table.text", function () {
    return {
        restrict: "E",
        replace: true,
        scope: {
            table:      "=",
            rowsn:      "@",
            name:       "@",
            tooltip:    "@"
        },
        template: [
                    '<span class="wliu-text" scope="{{ table.scope }}" ng-hide="table.relationHide(rowsn, name)" ',
                        'ng-class="{ \'wliuCommon-input-invalid\': table.colByIndex(rowsn, name).errorCode }" ',
                        'wliu-popup popup-target="{{tooltip?table.tooltip:\'\'}}" popup-toggle="hover" popup-content="{{table.colByIndex(rowsn, name).errorCode?table.colByIndex(rowsn, name).errorMessage.nl2br():table.colMeta(name).coldesc?table.colMeta(name).coldesc:table.colMeta(name).colname}}" ',
                        'title="{{ tooltip?\'\':table.colByIndex(rowsn, name).errorCode?table.colByIndex(rowsn, name).errorMessage:table.colMeta(name).coldesc?table.colMeta(name).coldesc:table.colMeta(name).colname}}"',
                    '>',
                        '{{ table.colByIndex(rowsn, name).value }}',
                    '</span>'
                ].join(''),
        controller: function ($scope) {
        },
        link: function (sc, el, attr) {
        }
    }
});

wliu_table.directive("table.hidden", function () {
    return {
        restrict: "E",
        replace: true,
        transclude: true,
        scope: {
            table:      "=",
            rowsn:      "@",
            name:       "@"
        },
        template: [
                    '<span><input type="hidden" scope="{{ table.scope }}" ',
                        'ng-model="table.colByIndex(rowsn, name).value" ',
                        'ng-change="table.changeByIndex(rowsn, table.colByIndex(rowsn, name))" ',
                        'ng-disabled="table.colByIndex(rowsn, name)==undefined" ',
                    '/>',
                    '</span>'
                ].join(''),
        controller: function ($scope) {
        }
    }
});

wliu_table.directive("table.textbox", function () {
    return {
        restrict: "E",
        replace: true,
        scope: {
            table:      "=",
            rowsn:      "@",
            name:       "@",
            tooltip:    "@"
        },
        template: [
                    '<input type="textbox" scope="{{ table.scope }}" ng-hide="table.relationHide(rowsn, name)" ',
                        //'ng-init="col=table.colByIndex(rowsn, name)" ',
                        'ng-class="{ \'wliuCommon-input-invalid\': table.colByIndex(rowsn, name).errorCode }" ',
                        'ng-model="table.colByIndex(rowsn, name).value" ',
                        'ng-change="table.changeByIndex(rowsn, table.colByIndex(rowsn, name))" ',
                        'ng-disabled="table.colByIndex(rowsn, name)==undefined" ',
                        'ng-model-options="{ updateOn:\'default blur\', debounce:{default: 500, blur:0} }" ',

                        'wliu-popup popup-target="{{tooltip?table.tooltip:\'\'}}" popup-toggle="hover" popup-content="{{table.colByIndex(rowsn, name).errorCode?table.colByIndex(rowsn, name).errorMessage.nl2br():table.colMeta(name).coldesc?table.colMeta(name).coldesc:table.colMeta(name).colname}}" ',
                        'title="{{tooltip? \'\':table.colByIndex(rowsn, name).errorCode?table.colByIndex(rowsn, name).errorMessage:table.colMeta(name).coldesc?table.colMeta(name).coldesc:table.colMeta(name).colname}}" ',
                    '/>'
                ].join(''),
        controller: function ($scope) {
        },
        link: function (sc, el, attr) {
        }
    }
});

wliu_table.directive("table.password", function () {
    return {
        restrict: "E",
        replace: true,
        scope: {
            table:      "=",
            rowsn:      "@",
            name:       "@",
            tooltip:    "@"
        },
        template: [
                    '<input type="password" scope="{{ table.scope }}" placeholder="Password" ng-hide="table.relationHide(rowsn, name)" ',
                        //'ng-init="col=table.colByIndex(rowsn, name)" ',
                        'ng-class="{ \'wliuCommon-input-invalid\': table.colByIndex(rowsn, name).errorCode }" ',
                        'ng-model="table.colByIndex(rowsn, name).value" ',
                        'ng-change="table.changeByIndex(rowsn, table.colByIndex(rowsn, name))" ',
                        'ng-disabled="table.colByIndex(rowsn, name)==undefined" ',
                        'ng-model-options="{ updateOn:\'default blur\', debounce:{default: 500, blur:0} }" ',

                        'wliu-popup popup-target="{{tooltip?table.tooltip:\'\'}}" popup-toggle="hover" popup-content="{{table.colByIndex(rowsn, name).errorCode?table.colByIndex(rowsn, name).errorMessage.nl2br():table.colMeta(name).coldesc?table.colMeta(name).coldesc:table.colMeta(name).colname}}" ',
                        'title="{{tooltip?\'\':table.colByIndex(rowsn, name).errorCode?table.colByIndex(rowsn, name).errorMessage:table.colMeta(name).coldesc?table.colMeta(name).coldesc:table.colMeta(name).colname}}" ',
                    '/>'
                ].join(''),
        controller: function ($scope) {
        },
        link: function (sc, el, attr) {
        }
    }
});

wliu_table.directive("table.passpair", function () {
    return {
        restrict: "E",
        replace: true,
        scope: {
            table:      "=",
            rowsn:      "@",
            name:       "@",
            tooltip:    "@"
        },
        template: [
                    '<span style="display:inline-block;vertical-align:top;" ng-hide="table.relationHide(rowsn, name)">',
                    '<input type="password" style="box-sizing:border-box;width:100%;" scope="{{ table.scope }}" placeholder="Password" ',
                        'ng-class="{ \'wliuCommon-input-invalid\': table.colByIndex(rowsn, name).errorCode }" ',
                        'ng-model="table.colByIndex(rowsn, name).value.password" ',
                        'ng-change="passChange()" ',
                        'ng-disabled="table.colByIndex(rowsn, name)==undefined" ',
                        'ng-model-options="{ updateOn:\'default blur\', debounce:{default: 500, blur:0} }" ',

                        'wliu-popup popup-target="{{tooltip?table.tooltip:\'\'}}" popup-toggle="hover" popup-content="{{table.colByIndex(rowsn, name).errorCode?table.colByIndex(rowsn, name).errorMessage.nl2br():\'\'}}" ',
                        'title="{{tooltip?\'\':table.colByIndex(rowsn, name).errorCode?table.colByIndex(rowsn, name).errorMessage:\'\'}}" ',
                    '/>',
                    '<input type="password" style="box-sizing:border-box;width:100%;" scope="{{ table.scope }}" placeholder="Confirm Password" ',
                        'ng-class="{ \'wliuCommon-input-invalid\': table.colByIndex(rowsn, name).value.password!=table.colByIndex(rowsn, name).value.confirm }" ',
                        'ng-model="table.colByIndex(rowsn, name).value.confirm" ',
                        //'ng-change="confirmChange()" ',
                        'ng-disabled="table.colByIndex(rowsn, name)==undefined" ',
                        'ng-model-options="{ updateOn:\'default blur\', debounce:{default: 500, blur:0} }" ',

                        'wliu-popup popup-target="{{tooltip?table.tooltip:\'\'}}" popup-toggle="hover" popup-content="{{table.colByIndex(rowsn, name).value.password!=table.colByIndex(rowsn, name).value.confirm ?\'Password not match!\':\'\'}}" ',
                        'title="{{tooltip?\'\':table.colByIndex(rowsn, name).value.password!=table.colByIndex(rowsn, name).value.confirm?\'Password not match!\':\'\'}}" ',
                    '/>',
                    '</span>'
                ].join(''),
        controller: function ($scope) {
            $scope.passChange = function() {
                $scope.table.changeByIndex($scope.rowsn, $scope.table.colByIndex($scope.rowsn, $scope.name));
                //$scope.confirmChange();
            }
            /*
            $scope.confirmChange = function() {
                if( $scope.table.colByIndex($scope.rowsn, $scope.name).value.password == $scope.table.colByIndex($scope.rowsn, $scope.name).value.confirm ) {
                    $scope.table.colErrorByIndex($scope.rowsn, $scope.name, {errorCode:0, errorMessage:""});
                } else {
                    $scope.table.colErrorByIndex($scope.rowsn, $scope.name, {errorCode:1, errorMessage:"Password not match"});
                }
            }
            */
        },
        link: function (sc, el, attr) {
        }
    }
});

wliu_table.directive("table.textarea", function () {
    return {
        restrict: "E",
        replace: true,
        scope: {
            table:      "=",
            rowsn:      "@",
            name:       "@",
            tooltip:    "@"
        },
        template: [
                    '<textarea scope="{{ table.scope }}" ng-hide="table.relationHide(rowsn, name)" ',
                        //'ng-init="col=table.colByIndex(rowsn, name)" ',
                        'ng-class="{ \'wliuCommon-input-invalid\': table.colByIndex(rowsn, name).errorCode }" ',
                        'ng-model="table.colByIndex(rowsn, name).value" ',
                        'ng-change="table.changeByIndex(rowsn, table.colByIndex(rowsn, name))" ',
                        'ng-disabled="table.colByIndex(rowsn, name)==undefined" ',
                        'ng-model-options="{ updateOn:\'default blur\', debounce:{default: 500, blur:0} }" ',

                        'wliu-popup popup-target="{{tooltip?table.tooltip:\'\'}}" popup-toggle="hover" popup-content="{{table.colByIndex(rowsn, name).errorCode?table.colByIndex(rowsn, name).errorMessage.nl2br():table.colMeta(name).coldesc?table.colMeta(name).coldesc:table.colMeta(name).colname}}" ',
                        'title="{{tooltip?\'\':table.colByIndex(rowsn, name).errorCode?table.colByIndex(rowsn, name).errorMessage:table.colMeta(name).coldesc?table.colMeta(name).coldesc:table.colMeta(name).colname}}" ',
                    '>',
                    '</textarea>'
                ].join(''),
        controller: function ($scope) {
        },
        link: function (sc, el, attr) {
        }
    }
});

wliu_table.directive("table.select", function () {
    return {
        restrict: "E",
        replace: true,
        scope: {
            table:      "=",
            rowsn:      "@",
            name:       "@",
            tooltip:    "@"
        },
        template: [
			    '<select scope="{{ table.scope }}" ng-hide="table.relationHide(rowsn, name)" ',
                        'ng-class="{ \'wliuCommon-input-invalid\': table.colByIndex(rowsn, name).errorCode }" ',
                        'ng-model="table.colByIndex(rowsn, name).value" ',
                        'ng-change="table.changeByIndex(rowsn, table.colByIndex(rowsn, name))" ',
                        'ng-disabled="table.colByIndex(rowsn, name)==undefined" ',
                        'ng-options="sObj.key as sObj.value for sObj in table.lists[table.colMeta(name).list].list" ',                        
                        'wliu-popup popup-target="{{tooltip?table.tooltip:\'\'}}" popup-toggle="hover" popup-content="{{table.colByIndex(rowsn, name).errorCode?table.colByIndex(rowsn, name).errorMessage.nl2br():table.colMeta(name).coldesc?table.colMeta(name).coldesc:table.colMeta(name).colname}}" ',
                        'title="{{tooltip?\'\':table.colByIndex(rowsn, name).errorCode?table.colByIndex(rowsn, name).errorMessage:table.colMeta(name).coldesc?table.colMeta(name).coldesc:table.colMeta(name).colname}}"',
                 '>',
                 '<option value=""></option>',
                 '</select>'
                ].join(''),
        controller: function ($scope) {
        },
        link: function (sc, el, attr) {
        }
    }
});

wliu_table.directive("table.relation", function () {
    return {
        restrict: "E",
        replace: true,
        scope: {
            table:      "=",
            rowsn:      "@",
            name:       "@",
            label:      "@",
            tooltip:    "@"
        },
        template: [
                    '<span class="checkbox" scope="{{ table.scope }}" ',
                        'ng-class="{ \'wliuCommon-input-invalid\': table.colByIndex(rowsn, name).errorCode }" ',
                        'wliu-popup popup-target="{{tooltip?table.tooltip:\'\'}}" popup-toggle="hover" popup-content="{{table.colByIndex(rowsn, name).errorCode?table.colByIndex(rowsn, name).errorMessage.nl2br():table.colMeta(name).coldesc?table.colMeta(name).coldesc:table.colMeta(name).colname}}" ',
                        'title="{{tooltip==\'1\'?\'\':table.colByIndex(rowsn, name).errorCode?table.colByIndex(rowsn, name).errorMessage:table.colMeta(name).coldesc?table.colMeta(name).coldesc:table.colMeta(name).colname}}" ',
                    '>',
                            '<input type="checkbox" scope="{{ table.scope }}" id="{{table.scope}}_{{name}}_{{rowsn}}" ',
                                'ng-model="table.colByIndex(rowsn, name).value" ng-value="1"  ',
                                'ng-change="table.relationChange(rowsn); table.changeByIndex(rowsn, table.colByIndex(rowsn, name));" ',
                                'ng-disabled="table.colByIndex(rowsn, name)==undefined" ',
                            '/>',

                            '<label for="{{table.scope}}_{{name}}_{{rowsn}}" title="{{table.colMeta(name).coldesc?table.colMeta(name).coldesc:table.colMeta(name).colname?table.colMeta(name).colname:name}}">',
                                //'<abbr title="{{rdObj.desc}}" ng-if="rdObj.desc!=\'\'">{{ rdObj.value }}</abbr>',
                                '{{ label.toLowerCase()=="default"?table.colMeta(name).colname:label?label:"" }}',
                            '</label>',

                    '</span>',
                ].join(''),
        controller: function ($scope) {
        },
        link: function (sc, el, attr) {
        }
    }
});

wliu_table.directive("table.bool", function () {
    return {
        restrict: "E",
        replace: true,
        scope: {
            table:      "=",
            rowsn:      "@",
            name:       "@",
            label:      "@",
            tooltip:    "@"
        },
        template: [
                    '<span class="checkbox" scope="{{ table.scope }}" ng-hide="table.relationHide(rowsn, name)" ',
                        'ng-class="{ \'wliuCommon-input-invalid\': table.colByIndex(rowsn, name).errorCode }" ',
                        'wliu-popup popup-target="{{tooltip?table.tooltip:\'\'}}" popup-toggle="hover" popup-content="{{table.colByIndex(rowsn, name).errorCode?table.colByIndex(rowsn, name).errorMessage.nl2br():table.colMeta(name).coldesc?table.colMeta(name).coldesc:table.colMeta(name).colname}}" ',
                        'title="{{tooltip==\'1\'?\'\':table.colByIndex(rowsn, name).errorCode?table.colByIndex(rowsn, name).errorMessage:table.colMeta(name).coldesc?table.colMeta(name).coldesc:table.colMeta(name).colname}}" ',
                    '>',

                            '<input type="checkbox" scope="{{ table.scope }}" id="{{table.scope}}_{{name}}_{{rowsn}}" ',
                                'ng-model="table.colByIndex(rowsn, name).value" ng-value="1"  ',
                                'ng-change="table.changeByIndex(rowsn, table.colByIndex(rowsn, name))" ',
                                'ng-disabled="table.colByIndex(rowsn, name)==undefined" ',
                            '/>',

                            '<label for="{{table.scope}}_{{name}}_{{rowsn}}" title="{{table.colMeta(name).coldesc?table.colMeta(name).coldesc:table.colMeta(name).colname?table.colMeta(name).colname:name}}">',
                                //'<abbr title="{{rdObj.desc}}" ng-if="rdObj.desc!=\'\'">{{ rdObj.value }}</abbr>',
                                '{{ label.toLowerCase()=="default"?table.colMeta(name).colname:label?label:"" }}',
                            '</label>',

                    '</span>',
                ].join(''),
        controller: function ($scope) {
        },
        link: function (sc, el, attr) {
        }
    }
});

wliu_table.directive("table.datetime", function () {
    return {
        restrict: "E",
        replace: true,
        scope: {
            table:      "=",
            rowsn:      "@",
            name:       "@",
            tooltip:    "@"
        },
        template: [
                    '<span  ng-hide="table.relationHide(rowsn, name)" ',
                        //'ng-init="table.colByIndex(rowsn, name).value=$.isPlainObject(table.colByIndex(rowsn, name).value)?table.colByIndex(rowsn, name).value:{}" ',
                        'wliu-popup popup-target="{{tooltip?table.tooltip:\'\'}}" popup-toggle="hover" popup-content="{{table.colByIndex(rowsn, name).errorCode?table.colByIndex(rowsn, name).errorMessage.nl2br():table.colMeta(name).coldesc?table.colMeta(name).coldesc:table.colMeta(name).colname}}" ',
                        'title="{{tooltip?\'\':table.colByIndex(rowsn, name).errorCode?table.colByIndex(rowsn, name).errorMessage:table.colMeta(name).coldesc?table.colMeta(name).coldesc:table.colMeta(name).colname}}"',                    
                    '>',
                        '<input type="textbox" class="wliuCommon-datepicker" scope="{{ table.scope }}" placeholder="yyyy-mm-dd" ',
                            'ng-class="{ \'wliuCommon-input-invalid\': table.colByIndex(rowsn, name).errorCode }" ',
                            'ng-model="table.colByIndex(rowsn, name).value.date" ',
                            'ng-change="table.changeByIndex(rowsn, table.colByIndex(rowsn, name))" ',
                            'ng-disabled="table.colByIndex(rowsn, name)==undefined" ',
                        '/>',
                        '<input type="textbox" class="wliuCommon-timepicker" scope="{{ table.scope }}" placeholder="hh:mm" ',
                            //'ng-init="col=table.colByIndex(rowsn, name)" ',
                            'ng-class="{ \'wliuCommon-input-invalid\': table.colByIndex(rowsn, name).errorCode }" ',
                            'ng-model="table.colByIndex(rowsn, name).value.time" ',
                            'ng-change="table.changeByIndex(rowsn, table.colByIndex(rowsn, name))" ',
                            'ng-disabled="table.colByIndex(rowsn, name)==undefined" ',
                        '/>',
                    '</span>'
                ].join(''),
        controller: function ($scope) {
        },
        link: function (sc, el, attr) {
            $(function(){
                var today = new Date();
                $("input.wliuCommon-datepicker", el).pickadate({
                    format: "yyyy-mm-dd",
                    formatSubmit: "yyyy-mm-dd",
                    closeOnSelect: true,
                    disable: [ {from:[2016,9,1], to:[2016,9,10]} , [2016,10,5] ],
                    //min: new Date(2015,3,20),
                    //max: new Date(2016,11,14),
                    selectYears: 200,
                    min: new Date(today.getFullYear()-90,1,1),
                    max: new Date(today.getFullYear()+10,12,31)
                });

                $("input.wliuCommon-timepicker", el).pickatime({
                    twelvehour: false
                });

            });
        }
    }
});

wliu_table.directive("table.date", function () {
    return {
        restrict: "E",
        replace: true,
        scope: {
            table:      "=",
            rowsn:      "@",
            name:       "@",
            tooltip:    "@"
        },
        template: [
                    '<input type="textbox" class="wliuCommon-datepicker" scope="{{ table.scope }}" placeholder="yyyy-mm-dd" ng-hide="table.relationHide(rowsn, name)" ',
                        //'ng-init="col=table.colByIndex(rowsn, name)" ',
                        'ng-class="{ \'wliuCommon-input-invalid\': table.colByIndex(rowsn, name).errorCode }" ',
                        'ng-model="table.colByIndex(rowsn, name).value" ',
                        'ng-change="table.changeByIndex(rowsn, table.colByIndex(rowsn, name))" ',
                        'ng-disabled="table.colByIndex(rowsn, name)==undefined" ',
                        'wliu-popup popup-target="{{tooltip?table.tooltip:\'\'}}" popup-toggle="hover" popup-content="{{table.colByIndex(rowsn, name).errorCode?table.colByIndex(rowsn, name).errorMessage.nl2br():table.colMeta(name).coldesc?table.colMeta(name).coldesc:table.colMeta(name).colname}}" ',
                        'title="{{tooltip?\'\':table.colByIndex(rowsn, name).errorCode?table.colByIndex(rowsn, name).errorMessage:table.colMeta(name).coldesc?table.colMeta(name).coldesc:table.colMeta(name).colname}}" ',
                    '/>'
                ].join(''),
        controller: function ($scope) {
        },
        link: function (sc, el, attr) {
            $(function(){
                var today = new Date();
                $(el).pickadate({
                    format: "yyyy-mm-dd",
                    formatSubmit: "yyyy-mm-dd",
                    closeOnSelect: true,
                    disable: [ {from:[2016,9,1], to:[2016,9,10]} , [2016,10,5] ],
                    //min: new Date(2015,3,20),
                    //max: new Date(2016,11,14),
                    selectYears: 200,
                    min: new Date(today.getFullYear()-90,1,1),
                    max: new Date(today.getFullYear()+10,12,31)
                });
            });
        }
    }
});

wliu_table.directive("table.time", function () {
    return {
        restrict: "E",
        replace: true,
        scope: {
            table:      "=",
            rowsn:      "@",
            name:       "@",
            tooltip:    "@"
        },
        template: [
                    '<input type="textbox" class="wliuCommon-timepicker" scope="{{ table.scope }}" placeholder="hh:mm" ng-hide="table.relationHide(rowsn, name)" ',
                        //'ng-init="col=table.colByIndex(rowsn, name)" ',
                        'ng-class="{ \'wliuCommon-input-invalid\': table.colByIndex(rowsn, name).errorCode }" ',
                        'ng-model="table.colByIndex(rowsn, name).value" ',
                        'ng-change="table.changeByIndex(rowsn, table.colByIndex(rowsn, name))" ',
                        'ng-disabled="table.colByIndex(rowsn, name)==undefined" ',
                        'wliu-popup popup-target="{{tooltip?table.tooltip:\'\'}}" popup-toggle="hover" popup-content="{{table.colByIndex(rowsn, name).errorCode?table.colByIndex(rowsn, name).errorMessage.nl2br():table.colMeta(name).coldesc?table.colMeta(name).coldesc:table.colMeta(name).colname}}" ',
                        'title="{{tooltip?\'\':table.colByIndex(rowsn, name).errorCode?table.colByIndex(rowsn, name).errorMessage:table.colMeta(name).coldesc?table.colMeta(name).coldesc:table.colMeta(name).colname}}" ',
                    '/>'
                ].join(''),
        controller: function ($scope) {
        },
        link: function (sc, el, attr) {
            $(function(){
                $(el).pickatime({
                    twelvehour: false
                });
            });
        }
    }
});

wliu_table.directive("table.intdate", function () {
    return {
        restrict: "E",
        replace: true,
        transclude: true,
        scope: {
            table:      "=",
            rowsn:      "@",
            name:       "@",
            format:     "@"
        },
        template: [
                    '<span ng-hide="table.relationHide(rowsn, name)">{{ table.colByIndex(rowsn, name).value?(table.colByIndex(rowsn, name).value>0?(table.colByIndex(rowsn, name).value * 1000 | date : (format?format:"yyyy-MM-dd hh:mm") ):"") :"" }}</span>'
				  ].join(''),
        controller: function ($scope) {
        }
    }
});

wliu_table.directive("table.checkbox", function () {
    return {
        restrict: "E",
        replace: true,
        scope: {
            table:      "=",
            name:       "@",
            rowsn:      "@",
            colnum:     "@",
            tooltip:    "@"
        },
        template: [
                    '<div  scope="{{ table.scope }}" ng-hide="table.relationHide(rowsn, name)" ',
                        //'ng-init="table.colByIndex(rowsn, name).value=$.isPlainObject(table.colByIndex(rowsn, name).value)?table.colByIndex(rowsn, name).value:{}" ',
                        'ng-class="{ \'wliuCommon-input-invalid\': table.colByIndex(rowsn, name).errorCode }" ',
                        'wliu-popup popup-target="{{tooltip?table.tooltip:\'\'}}" popup-toggle="hover" popup-content="{{table.colByIndex(rowsn, name).errorCode?table.colByIndex(rowsn, name).errorMessage.nl2br():table.colMeta(name).coldesc?table.colMeta(name).coldesc:table.colMeta(name).colname}}" ',
                        'title="{{tooltip?\'\':table.colByIndex(rowsn, name).errorCode?table.colByIndex(rowsn, name).errorMessage:table.colMeta(name).coldesc?table.colMeta(name).coldesc:table.colMeta(name).colname}}" ',
                    '>',
                        '<span ',
                            //'ng-init="table.colByIndex(rowsn, name).value=table.colByIndex(rowsn, name).value?table.colByIndex(rowsn, name).value:{};" ',                          
                            'ng-repeat="rdObj in table.lists[table.colMeta(name).list].list">',
                                '<span class="checkbox">',

                                        '<input type="checkbox" scope="{{ table.scope }}" id="{{table.scope}}_{{name}}_{{rowsn}}_{{rdObj.key}}" ',
                                            'ng-model="table.colByIndex(rowsn, name).value[rdObj.key]" ng-value="rdObj.key"  ',
                                            'ng-change="table.changeByIndex(rowsn, table.colByIndex(rowsn, name))" ',
                                            'ng-disabled="table.colByIndex(rowsn, name)==undefined" ',
                                        '/>',

                                        '<label for="{{table.scope}}_{{name}}_{{rowsn}}_{{rdObj.key}}" title="{{rdObj.desc?rdObj.desc:rdObj.value}}">',
                                            //'<abbr title="{{rdObj.desc}}" ng-if="rdObj.desc!=\'\'">{{ rdObj.value }}</abbr>',
                                            '{{ rdObj.value }}',
                                        '</label>',

                                '</span>',
                                '<br ng-if="colnum>0?(($index+1)%colnum)==0:false" />',
                        '</span>',
                    '</div>'
                ].join(''),
        controller: function ($scope) {
        },
        link: function (sc, el, attr) {
        }
    }
});

wliu_table.directive("table.checkbox1", function () {
    return {
        restrict: "E",
        replace: true,
        scope: {
            table:      "=",
            rowsn:      "@",
            name:       "@",
            targetid:   "@",
            tooltip:    "@"
        },
        template: [
                    '<input type="text" readonly scope="{{ table.scope }}" class="wliuCommon-checklist" value="{{ valueText() }}" ng-hide="table.relationHide(rowsn, name)" ',
                            'ng-click="change(rowsn, name)" ',
                            'ng-class="{ \'wliuCommon-input-invalid\': table.colByIndex(rowsn, name).errorCode }" ',
                            'wliu-diag  diag-target="{{targetid}}" diag-toggle="click" ',
                            'wliu-popup popup-target="{{tooltip?table.tooltip:\'\'}}" popup-toggle="hover" popup-content="{{table.colByIndex(rowsn, name).errorCode?table.colByIndex(rowsn, name).errorMessage.nl2br():valueText()?valueText():table.colMeta(name).coldesc?table.colMeta(name).coldesc:table.colMeta(name).colname}}" ',
                            'title="{{tooltip?\'\':table.colByIndex(rowsn, name).errorCode?table.colByIndex(rowsn, name).errorMessage:valueText()?valueText():table.colMeta(name).coldesc?table.colMeta(name).coldesc:table.colMeta(name).colname}}" ',
                    '/>'
                ].join(''),
        controller: function ($scope) {
            $scope.table.lists[ $scope.table.colMeta($scope.name).list ].keys = $scope.table.lists[ $scope.table.colMeta($scope.name).list ].keys || {};
            $scope.change = function(rowsn, name) {
                $scope.table.lists[ $scope.table.colMeta($scope.name).list ].keys.rowsn = rowsn;
                $scope.table.lists[ $scope.table.colMeta($scope.name).list ].keys.name = name;
            }
            $scope.valueText = function() {
                    var text = $.map( $scope.table.lists[$scope.table.colMeta($scope.name).list].list , function(n) {
                    if( $scope.table.colByIndex( $scope.rowsn, $scope.name )!= undefined ) {
                        if($scope.table.colByIndex( $scope.rowsn, $scope.name ).value[n.key]) 
                            return n.value;
                        else
                            return null;
                    } else {
                        return null;
                    }

               }).join("; ");
               return text;
            }
        },
        link: function (sc, el, attr) {
        }
    }
});

wliu_table.directive("table.checkdiag1", function () {
    return {
        restrict: "E",
        replace: true,
        scope: {
            table:      "=",
            name:       "@",
            targetid:   "@",
            colnum:     "@",
            bar:        "@",
            title:      "@"
        },
        template: [
                    '<div id="{{targetid}}" class="wliu-diag" scope="{{ table.scope }}" ',
                        //'ng-init="table.colByIndex( table.lists[name].keys.rowsn, table.lists[name].keys.name ).value=$.isPlainObject(table.colByIndex( table.lists[name].keys.rowsn, table.lists[name].keys.name ).value)?table.colByIndex( table.lists[name].keys.rowsn, table.lists[name].keys.name ).value:{}" ',
                    '>',

                        '<a class="wliu-btn24 wliu-btn24-selectlist" ng-show="bar==1">',
                            '<div class="wliu-selectlist">',
                                '<div class="wliu-selectlist-title info-color text-center">SELECTED</div>',
                                '<ul class="wliu-selectlist-content">',
                                    '<li ng-repeat="vObj in valueArr(table.lists[name].keys.rowsn, table.lists[name].keys.name)">',
                                    '{{ vObj.value }}',
                                    '</li>',
                                '</ul>',
                            '</div>',
                        '</a>',

                        '<input type="text" class="wliuCommon-search" ng-model="search" ng-model-options="{ updateOn:\'default blur\', debounce:{default: 500, blur:0} }" ng-show="bar==1" />',
                        '<a class="wliu-btn24 wliu-btn24-checkall" ng-click="checkall(table.lists[name].keys.rowsn, table.lists[name].keys.name)" title="check all"  ng-show="bar==1"></a>',
                        '<a class="wliu-btn24 wliu-btn24-removeall" ng-click="removeall(table.lists[name].keys.rowsn, table.lists[name].keys.name)" title="remove all"  ng-show="bar==1"></a>',
                        '<div class="wliu-underline" ng-show="bar==1"></div>',
                        '<div class="wliu-diag-content" style="font-size:14px;">',
                        '<span ',
                            'ng-repeat="rdObj in table.lists[name].list|filter:search">',
                                '<span class="checkbox">',

                                        '<input type="checkbox" scope="{{ table.scope }}" id="{{table.scope}}_{{name}}_{{rdObj.key}}" ',
                                            'ng-model="table.colByIndex( table.lists[name].keys.rowsn, table.lists[name].keys.name ).value[rdObj.key]" ng-value="rdObj.key"  ',
                                            'ng-change="table.changeByIndex( table.lists[name].keys.rowsn, table.colByIndex(table.lists[name].keys.rowsn, table.lists[name].keys.name) )" ',
                                            'ng-disabled="table.colByIndex( table.lists[name].keys.rowsn, table.lists[name].keys.name )==undefined" ',
                                        '/>',

                                        '<label for="{{table.scope}}_{{name}}_{{rdObj.key}}" title="{{rdObj.desc?rdObj.desc:rdObj.value}}">',
                                            '{{ rdObj.value }}',
                                        '</label>',

                                '</span>',
                                '<br ng-if="colnum>0?(($index+1)%colnum)==0:false" />',
                        '</span>',
                        '</div>',    
                    '</div>'
            
                ].join(''),
        controller: function ($scope) {
            $scope.table.lists[$scope.name].keys = $scope.table.lists[$scope.name].keys || {};
            $scope.change = function(rowsn, name) {
                // $scope.name is  lists[name],   name is colname
                $scope.table.lists[$scope.name].keys.rowsn = rowsn;
                $scope.table.lists[$scope.name].keys.name = name;
            }

            $scope.checkall = function(rowsn, name) {
                $scope.table.colByIndex( rowsn, name ).value = $scope.table.colByIndex( rowsn, name ).value || {};
                for( var key in $scope.table.lists[$scope.name].list  ) {
                    $scope.table.colByIndex( rowsn, name ).value[ $scope.table.lists[$scope.name].list[key].key ] = true;
                }
                $scope.table.changeByIndex(rowsn, $scope.table.colByIndex( rowsn, name ));
            }

            $scope.removeall = function(rowsn, name) {
                for( var key in $scope.table.lists[$scope.name].list  ) {
                    $scope.table.colByIndex( rowsn, name ).value = {};
                }
                $scope.table.changeByIndex(rowsn, $scope.table.colByIndex( rowsn, name ));
            }

            $scope.valueArr = function(rowsn, name) {
               var valueArr = $.map( $scope.table.lists[$scope.name].list , function(n) {
                   if( $scope.table.colByIndex( rowsn, name  )!= undefined  ) {
                        if( $scope.table.colByIndex( rowsn, name  ).value[n.key] ) 
                                return n;
                        else
                                return null;
                   } else {
                       return null;
                   }

               });
               return valueArr;
            }
            
        },
        link: function (sc, el, attr) {
            $(function(){
                $(el).wliuDiag({ fade:false, movable: true, title: sc.title});
            });
        }
    }
});

wliu_table.directive("table.checklist1", function () {
    return {
        restrict: "E",
        replace: true,
        scope: {
            table:      "=",
            name:       "@",
            rowsn:      "@",
            colnum:     "@",
            bar:        "@",
            title:      "@"
        },
        template: [
                    '<div class="col-md-12" style="border:1px dotted #666666;border-radius:5px; padding:2px; overflow-y:auto;text-align:left; min-width:240px;" scope="{{ table.scope }}" ng-hide="table.relationHide(rowsn, name)" ',
                        //'ng-init="table.colByIndex( rowsn, name ).value=$.isPlainObject(table.colByIndex( rowsn, name ).value)?table.colByIndex( rowsn, name ).value:{}"',
                    '>',
                        '<a class="wliu-btn24 wliu-btn24-selectlist" ng-show="bar==1">',
                            '<div class="wliu-selectlist">',
                                '<div class="wliu-selectlist-title info-color text-center">SELECTED</div>',
                                '<ul class="wliu-selectlist-content">',
                                    '<li ng-repeat="vObj in valueArr()">',
                                    '{{ vObj.value }}',
                                    '</li>',
                                '</ul>',
                            '</div>',
                        '</a>',

                        '<input type="text" class="wliuCommon-search" ng-model="search" ng-model-options="{ updateOn:\'default blur\', debounce:{default: 500, blur:0} }" ng-show="bar==1" />',
                        '<a class="wliu-btn24 wliu-btn24-checkall" ng-click="checkall()" title="check all" ng-show="bar==1"></a>',
                        '<a class="wliu-btn24 wliu-btn24-removeall" ng-click="removeall()" title="remove all" ng-show="bar==1"></a>',
                        '<div class="wliu-underline" ng-show="bar==1"></div>',
                        '<div class="wliu-diag-content" style="font-size:14px;">',
                        '<span ',
                            'ng-repeat="rdObj in table.lists[table.colMeta(name).list].list|filter:search">',
                                '<span class="checkbox">',

                                        '<input type="checkbox" scope="{{ table.scope }}" id="{{table.scope}}_{{name}}_{{rowsn}}_{{rdObj.key}}" ',
                                            'ng-model="table.colByIndex( rowsn, name ).value[rdObj.key]" ng-value="rdObj.key"  ',
                                            'ng-change="table.changeByIndex( rowsn, table.colByIndex(rowsn, name) )" ',
                                            'ng-disabled="table.colByIndex( rowsn, name )==undefined" ',
                                        '/>',

                                        '<label for="{{table.scope}}_{{name}}_{{rowsn}}_{{rdObj.key}}" title="{{rdObj.desc?rdObj.desc:rdObj.value}}">',
                                            '{{ rdObj.value }}',
                                        '</label>',

                                '</span>',
                                '<br ng-if="colnum>0?(($index+1)%colnum)==0:false" />',
                        '</span>',
                        '</div>',    
                    '</div>'
            
                ].join(''),
        controller: function ($scope) {
            $scope.table.lists[$scope.table.colMeta($scope.name).list].keys = $scope.table.lists[$scope.table.colMeta($scope.name).list].keys || {};

            $scope.checkall = function() {
                $scope.table.colByIndex( $scope.rowsn, $scope.name ).value = $scope.table.colByIndex( $scope.rowsn, $scope.name ).value || {};
                for( var key in $scope.table.lists[$scope.table.colMeta($scope.name).list].list  ) {
                    $scope.table.colByIndex( $scope.rowsn, $scope.name ).value[ $scope.table.lists[$scope.table.colMeta($scope.name).list].list[key].key ] = true;
                }

                $scope.table.changeByIndex($scope.rowsn, $scope.table.colByIndex( $scope.rowsn, $scope.name ));
            }

            $scope.removeall = function() {
                for( var key in $scope.table.lists[$scope.table.colMeta($scope.name).list].list  ) {
                    $scope.table.colByIndex( $scope.rowsn, $scope.name ).value = {};
                }
                $scope.table.changeByIndex($scope.rowsn, $scope.table.colByIndex( $scope.rowsn, $scope.name ));
            }

            $scope.valueArr = function() {
               var valueArr = $.map( $scope.table.lists[$scope.table.colMeta($scope.name).list].list , function(n) {
                   if( $scope.table.colByIndex( $scope.rowsn, $scope.name  )!= undefined  ) {
                        if( $scope.table.colByIndex( $scope.rowsn, $scope.name  ).value[n.key] ) 
                                return n;
                        else
                                return null;
                   } else {
                       return null;
                   }

               });
               return valueArr;
            }
            
        },
        link: function (sc, el, attr) {
        }
    }
});

wliu_table.directive("table.checkbox2", function () {
    return {
        restrict: "E",
        replace: true,
        scope: {
            table:      "=",
            rowsn:      "@",
            name:       "@",
            targetid:   "@",
            tooltip:    "@"
        },
        template: [
                        '<input type="text" readonly scope="{{ table.scope }}" class="wliuCommon-checklist" value="{{ valueText() }}" ng-hide="table.relationHide(rowsn, name)" ',
                                'ng-click="change(rowsn, name)" ',
                                'ng-class="{ \'wliuCommon-input-invalid\': table.colByIndex(rowsn, name).errorCode }" ',

                                'wliu-diag  diag-target="{{targetid}}" diag-toggle="click" ',
                                'wliu-popup popup-target="{{tooltip?table.tooltip:\'\'}}" popup-toggle="hover" popup-content="{{table.colByIndex(rowsn, name).errorCode?table.colByIndex(rowsn, name).errorMessage.nl2br():valueText()?valueText():table.colMeta(name).coldesc?table.colMeta(name).coldesc:table.colMeta(name).colname}}" ',
                                'title="{{tooltip?\'\':table.colByIndex(rowsn, name).errorCode?table.colByIndex(rowsn, name).errorMessage:valueText()?valueText():table.colMeta(name).coldesc?table.colMeta(name).coldesc:table.colMeta(name).colname}}" ',
                        '/>'
                ].join(''),
        controller: function ($scope) {
            $scope.table.lists[ $scope.table.colMeta($scope.name).list ].keys = $scope.table.lists[ $scope.table.colMeta($scope.name).list ].keys || {};
            $scope.change = function(rowsn, name) {
                $scope.table.lists[ $scope.table.colMeta($scope.name).list ].keys.rowsn = rowsn;
                $scope.table.lists[ $scope.table.colMeta($scope.name).list ].keys.name = name;
            }
            $scope.valueText = function() {
                var ret_text = "";
                for(var key in $scope.table.lists[$scope.table.colMeta($scope.name).list].list) {
                    var dList = $scope.table.lists[$scope.table.colMeta($scope.name).list].list[key].list;
                    var text = $.map( dList , function(n) {
                        if( $scope.table.colByIndex( $scope.rowsn, $scope.name )!=undefined ) {
                            if($scope.table.colByIndex( $scope.rowsn, $scope.name ).value[n.key]) 
                                    return n.value;
                            else
                                    return null;
                        } else {
                            return null;
                        }

                    }).join("; ");
                    ret_text += (ret_text && text?"; ":"") + text;
                }
                return ret_text;
            }
        },
        link: function (sc, el, attr) {
        }
    }
});

wliu_table.directive("table.checkdiag2", function () {
    return {
        restrict: "E",
        replace: true,
        scope: {
            table:      "=",
            name:       "@",
            targetid:   "@",
            colnum:     "@",
            colnum1:    "@",
            bar:        "@",
            title:      "@"
        },
        template: [
                    '<div id="{{targetid}}" class="wliu-diag container" scope="{{ table.scope }}" ',
                        //'ng-init="table.colByIndex( table.lists[name].keys.rowsn, table.lists[name].keys.name ).value=$.isPlainObject(table.colByIndex( table.lists[name].keys.rowsn, table.lists[name].keys.name ).value)?table.colByIndex( table.lists[name].keys.rowsn, table.lists[name].keys.name ).value:{}"',
                    '>',
                        '<a class="wliu-btn24 wliu-btn24-selectlist" ng-show="bar==1">',
                            '<div class="wliu-selectlist">',
                                '<div class="wliu-selectlist-title info-color text-center">SELECTED</div>',
                                '<ul class="wliu-selectlist-content">',
                                    '<li ng-repeat="vObj in valueArr(table.lists[name].keys.rowsn, table.lists[name].keys.name)">',
                                    '{{ vObj.value }}',
                                    '</li>',
                                '</ul>',
                            '</div>',
                        '</a>',
                        '<input type="text" class="wliuCommon-search" ng-model="search" ng-model-options="{ updateOn:\'default blur\', debounce:{default: 500, blur:0} }" ng-show="bar==1" />',
                        '<a class="wliu-btn24 wliu-btn24-checkall" ng-click="checkall(table.lists[name].keys.rowsn, table.lists[name].keys.name)" title="check all" ng-show="bar==1"></a>',
                        '<a class="wliu-btn24 wliu-btn24-removeall" ng-click="removeall(table.lists[name].keys.rowsn, table.lists[name].keys.name)" title="remove all" ng-show="bar==1"></a>',
                        '<div class="wliu-underline" ng-show="bar==1"></div>',
                        '<div class="wliu-diag-content" style="font-size:14px;">',
                            '<span style="display:none;" ng-repeat-start="rdObj in table.lists[name].list|filter:search"></span>',
                                    '<div class="col-md-{{colnum}} col-sm-{{colnum}} col-xs-12" ng-if="rdObj.list && rdObj.list.length>0">',
                                        '<ul>',
                                            '<li title="{{rdObj.desc?rdObj.desc:rdObj.value}}">',
                                                '<b>{{ rdObj.value }}</b>',
                                                '<ul style="border-top:1px solid #cccccc;">',
                                                        '<span ng-repeat="tdObj in rdObj.list|filter:search">',
                                                            '<span class="checkbox">',
                                                                    '<input type="checkbox" scope="{{ table.scope }}" id="{{table.scope}}_{{name}}_{{tdObj.key}}" ',
                                                                        'ng-model="table.colByIndex( table.lists[name].keys.rowsn, table.lists[name].keys.name ).value[tdObj.key]" ng-value="tdObj.key"  ',
                                                                        'ng-change="table.changeByIndex( table.lists[name].keys.rowsn, table.colByIndex(table.lists[name].keys.rowsn, table.lists[name].keys.name) )" ',
                                                                        'ng-disabled="table.colByIndex( table.lists[name].keys.rowsn, table.lists[name].keys.name )==undefined" ',
                                                                    '/>',

                                                                    '<label for="{{table.scope}}_{{name}}_{{tdObj.key}}" title="{{tdObj.desc?tdObj.desc:tdObj.value}}">',
                                                                        '{{ tdObj.value }}',
                                                                    '</label>',

                                                            '</span>',
                                                            '<br ng-if="colnum1>0?(($index+1)%colnum1)==0:false" />',  
                                                        '</span>',                                                  
                                                '</ul>',    
                                            '</li>',
                                        '</ul>',
                                    '</div>',
                            '<span style="display:none;" ng-repeat-end></span>',
                        '</div>',    
                    '</div>'
            
                ].join(''),
        controller: function ($scope) {
            $scope.table.lists[$scope.name].keys = $scope.table.lists[$scope.name].keys || {};
            $scope.change = function(rowsn, name) {
                // $scope.name is  lists[name],   name is colname
                $scope.table.lists[$scope.name].keys.rowsn = rowsn;
                $scope.table.lists[$scope.name].keys.name = name;
            }

            $scope.checkall = function(rowsn, name) {
                $scope.table.colByIndex( rowsn, name ).value = $scope.table.colByIndex( rowsn, name ).value || {};
                for( var key in $scope.table.lists[$scope.name].list  ) {
                    var dList = $scope.table.lists[$scope.name].list[key].list;
                    for( var dkey in dList) {
                        $scope.table.colByIndex( rowsn, name ).value[ dList[dkey].key ] = true;
                    }
                }

                $scope.table.changeByIndex(rowsn, $scope.table.colByIndex( rowsn, name ));
            }

            $scope.removeall = function(rowsn, name) {
                for( var key in $scope.table.lists[$scope.name].list  ) {
                    $scope.table.colByIndex( rowsn, name ).value = {};
                }
                $scope.table.changeByIndex(rowsn, $scope.table.colByIndex( rowsn, name ));
            }

            $scope.valueArr = function(rowsn, name) {
                var ret_arr = [];
                for(var key in $scope.table.lists[$scope.name].list) {
                    var dList = $scope.table.lists[$scope.name].list[key].list;
                    var valueArr = $.map( dList , function(n) {
                        if( $scope.table.colByIndex( rowsn, name  )!= undefined  ) {
                                if( $scope.table.colByIndex( rowsn, name  ).value[n.key] ) 
                                        return n;
                                else
                                        return null;
                        } else {
                            return null;
                        }
                    });
                    $.merge(ret_arr, valueArr);
               }
               return ret_arr;
            }
            
        },
        link: function (sc, el, attr) {
            $(function(){
                $(el).wliuDiag({ fade:false, movable: true, title: sc.title});
            });
        }
    }
});

wliu_table.directive("table.checklist2", function () {
    return {
        restrict: "E",
        replace: true,
        scope: {
            table:      "=",
            name:       "@",
            rowsn:      "@",
            colnum:     "@",
            colnum1:    "@",
            bar:        "@",
            title:      "@"
        },
        template: [
                    '<div class="col-md-12" style="border:1px dotted #666666;border-radius:5px;overflow-y:auto;" scope="{{ table.scope }}" ng-hide="table.relationHide(rowsn, name)" ',
                        //'ng-init="table.colByIndex( rowsn, name ).value=$.isPlainObject(table.colByIndex( rowsn, name ).value)?table.colByIndex( rowsn, name ).value:{}"',
                    '>',
                        '<a class="wliu-btn24 wliu-btn24-selectlist" ng-show="bar==1">',
                            '<div class="wliu-selectlist">',
                                '<div class="wliu-selectlist-title info-color text-center">SELECTED</div>',
                                '<ul class="wliu-selectlist-content">',
                                    '<li ng-repeat="vObj in valueArr()">',
                                    '{{ vObj.value }}',
                                    '</li>',
                                '</ul>',
                            '</div>',
                        '</a>',
                        '<input type="text" class="wliuCommon-search" ng-model="search" ng-model-options="{ updateOn:\'default blur\', debounce:{default: 500, blur:0} }" ng-show="bar==1" />',
                        '<a class="wliu-btn24 wliu-btn24-checkall" ng-click="checkall()" title="check all" ng-show="bar==1"></a>',
                        '<a class="wliu-btn24 wliu-btn24-removeall" ng-click="removeall()" title="remove all" ng-show="bar==1"></a>',
                        '<div class="wliu-underline" ng-show="bar==1"></div>',
                        '<div class="wliu-diag-content" style="min-height:250px;min-width:350px;font-size:14px;">',
                            '<span style="display:none;" ng-repeat-start="rdObj in table.lists[table.colMeta(name).list].list|filter:search"></span>',
                                    '<div class="col-sm-{{colnum}}" ng-if="rdObj.list && rdObj.list.length>0">',
                                        '<ul>',
                                            '<li title="{{rdObj.desc?rdObj.desc:rdObj.value}}">',
                                                '<b>{{ rdObj.value }}</b>',
                                                '<ul style="border-top:1px solid #cccccc;">',
                                                        '<span ng-repeat="tdObj in rdObj.list|filter:search">',
                                                            '<span class="checkbox">',
                                                                    '<input type="checkbox" scope="{{ table.scope }}" id="{{table.scope}}_{{name}}_{{rowsn}}_{{tdObj.key}}" ',
                                                                        'ng-model="table.colByIndex( rowsn, name ).value[tdObj.key]" ng-value="tdObj.key"  ',
                                                                        'ng-change="table.changeByIndex( rowsn, table.colByIndex(rowsn, name) )" ',
                                                                        'ng-disabled="table.colByIndex( rowsn, name )==undefined" ',
                                                                    '/>',

                                                                    '<label for="{{table.scope}}_{{name}}_{{rowsn}}_{{tdObj.key}}" title="{{tdObj.desc?tdObj.desc:tdObj.value}}">',
                                                                        '{{ tdObj.value }}',
                                                                    '</label>',

                                                            '</span>',
                                                            '<br ng-if="colnum1>0?(($index+1)%colnum1)==0:false" />',  
                                                        '</span>',                                                  
                                                '</ul>',    
                                            '</li>',
                                        '</ul>',
                                    '</div>',
                            '<span style="display:none;" ng-repeat-end></span>',
                        '</div>',    
                    '</div>'
            
                ].join(''),
        controller: function ($scope) {
            $scope.table.lists[$scope.table.colMeta($scope.name).list].keys = $scope.table.lists[$scope.table.colMeta($scope.name).list].keys || {};

            $scope.checkall = function() {
                $scope.table.colByIndex( $scope.rowsn, $scope.name ).value = $scope.table.colByIndex( $scope.rowsn, $scope.name ).value || {};
                for( var key in $scope.table.lists[$scope.table.colMeta($scope.name).list].list  ) {
                    var dList = $scope.table.lists[$scope.table.colMeta($scope.name).list].list[key].list;
                    for( var dkey in dList) {
                        $scope.table.colByIndex( $scope.rowsn, $scope.name ).value[ dList[dkey].key ] = true;
                    }
                }
                $scope.table.changeByIndex($scope.rowsn, $scope.table.colByIndex( $scope.rowsn, $scope.name ));
            }

            $scope.removeall = function() {
                for( var key in $scope.table.lists[$scope.table.colMeta($scope.name).list].list  ) {
                    $scope.table.colByIndex( $scope.rowsn, $scope.name ).value = {};
                }
                $scope.table.changeByIndex($scope.rowsn, $scope.table.colByIndex( $scope.rowsn, $scope.name ));
            }

            $scope.valueArr = function() {
                var ret_arr = [];
                for(var key in $scope.table.lists[$scope.table.colMeta($scope.name).list].list) {
                    var dList = $scope.table.lists[$scope.table.colMeta($scope.name).list].list[key].list;
                    var valueArr = $.map( dList , function(n) {
                        if( $scope.table.colByIndex( $scope.rowsn, $scope.name  )!= undefined  ) {
                                if( $scope.table.colByIndex( $scope.rowsn, $scope.name  ).value[n.key] ) 
                                        return n;
                                else
                                        return null;
                        } else {
                            return null;
                        }
                    });
                    $.merge(ret_arr, valueArr);
               }
               return ret_arr;
            }
            
        },
        link: function (sc, el, attr) {
        }
    }
});

wliu_table.directive("table.checkbox3", function () {
    return {
        restrict: "E",
        replace: true,
        scope: {
            table:      "=",
            rowsn:      "@",
            name:       "@",
            targetid:   "@",
            tooltip:    "@"
        },
        template: [
                    '<input type="text" readonly scope="{{ table.scope }}" class="wliuCommon-checklist" value="{{ valueText() }}" ng-hide="table.relationHide(rowsn, name)" ',
                            'ng-click="change(rowsn, name)" ',
                            'ng-class="{ \'wliuCommon-input-invalid\': table.colByIndex(rowsn, name).errorCode }" ',

                            'wliu-diag  diag-target="{{targetid}}" diag-toggle="click" ',
                            'wliu-popup popup-target="{{tooltip?table.tooltip:\'\'}}" popup-toggle="hover" popup-content="{{table.colByIndex(rowsn, name).errorCode?table.colByIndex(rowsn, name).errorMessage.nl2br():valueText()?valueText():table.colMeta(name).coldesc?table.colMeta(name).coldesc:table.colMeta(name).colname}}" ',
                            'title="{{tooltip?\'\':table.colByIndex(rowsn, name).errorCode?table.colByIndex(rowsn, name).errorMessage:valueText()?valueText():table.colMeta(name).coldesc?table.colMeta(name).coldesc:table.colMeta(name).colname}}" ',
                    '/>'
                ].join(''),
        controller: function ($scope) {
            $scope.table.lists[ $scope.table.colMeta($scope.name).list ].keys = $scope.table.lists[ $scope.table.colMeta($scope.name).list ].keys || {};
            $scope.change = function(rowsn, name) {
                $scope.table.lists[ $scope.table.colMeta($scope.name).list ].keys.rowsn = rowsn;
                $scope.table.lists[ $scope.table.colMeta($scope.name).list ].keys.name = name;
            }
            $scope.valueText = function() {
                var ret_text = "";
                for(var key1 in $scope.table.lists[$scope.table.colMeta($scope.name).list].list) {
                    var list2 = $scope.table.lists[$scope.table.colMeta($scope.name).list].list[key1].list;
                    for(var key2 in list2) {
                        var list3 = list2[key2].list;
                        var text = $.map( list3 , function(n) {
                            if( $scope.table.colByIndex( $scope.rowsn, $scope.name )!= undefined ) {
                                if($scope.table.colByIndex( $scope.rowsn, $scope.name ).value[n.key]) 
                                        return n.value;
                                else
                                        return null;
                            } else {
                                return null;
                            }

                        }).join("; ");
                        ret_text += (ret_text && text?"; ":"") + text;
                    }
                }
                return ret_text;
            }
        },
        link: function (sc, el, attr) {
        }
    }
});

wliu_table.directive("table.checkdiag3", function () {
    return {
        restrict: "E",
        replace: true,
        scope: {
            table:      "=",
            name:       "@",
            targetid:   "@",
            colnum:     "@",
            colnum1:    "@",
            bar:        "@",
            title:      "@"
        },
        template: [
                    '<div id="{{targetid}}" class="wliu-diag container" scope="{{ table.scope }}" ',
                        //'ng-init="table.colByIndex( table.lists[name].keys.rowsn, table.lists[name].keys.name ).value=$.isPlainObject(table.colByIndex( table.lists[name].keys.rowsn, table.lists[name].keys.name ).value)?table.colByIndex( table.lists[name].keys.rowsn, table.lists[name].keys.name ).value:{}"',
                    '>',
                        '<a class="wliu-btn24 wliu-btn24-selectlist" ng-show="bar==1">',
                            '<div class="wliu-selectlist">',
                                '<div class="wliu-selectlist-title info-color text-center">SELECTED</div>',
                                '<ul class="wliu-selectlist-content">',
                                    '<li ng-repeat="vObj in valueArr(table.lists[name].keys.rowsn, table.lists[name].keys.name)">',
                                    '{{ vObj.value }}',
                                    '</li>',
                                '</ul>',
                            '</div>',
                        '</a>',
                        '<input type="text" class="wliuCommon-search" ng-model="search" ng-model-options="{ updateOn:\'default blur\', debounce:{default: 500, blur:0} }" ng-show="bar==1" />',
                        '<a class="wliu-btn24 wliu-btn24-checkall" ng-click="checkall(table.lists[name].keys.rowsn, table.lists[name].keys.name)" title="check all" ng-show="bar==1"></a>',
                        '<a class="wliu-btn24 wliu-btn24-removeall" ng-click="removeall(table.lists[name].keys.rowsn, table.lists[name].keys.name)" title="remove all" ng-show="bar==1"></a>',
                        
                        '<select class="wliuCommon-filter" ',
                                'ng-model="listFilter.key" ',
                                'ng-options="sObj.key as sObj.value for sObj in table.lists[name].list" ',                        
                        ' ng-show="bar==1">',
                        '<option value=""></option>',
                        '</select>',
                        '<div class="wliu-underline" ng-show="bar==1"></div>',
                        '<div class="wliu-diag-content" style="font-size:14px;">',
                            '<span style="display:none;" ng-repeat-start="bbObj in table.lists[name].list|filter:getListFilter()"></span>',
                            '<span style="display:none;" ng-repeat-start="rdObj in bbObj.list|filter:search"></span>',
                                    '<div class="col-md-{{colnum}} col-sm-{{colnum}} col-xs-12" ng-if="rdObj.list && rdObj.list.length>0">',
                                        '<ul>',
                                            '<li title="{{rdObj.desc?rdObj.desc:rdObj.value}}">',
                                                '<span style="white-space:nowrap;font-weight:700;">{{ rdObj.value }}</span>',
                                                '<ul style="border-top:1px solid #cccccc;">',
                                                        '<span ng-repeat="tdObj in rdObj.list|filter:search">',
                                                            '<span class="checkbox">',
                                                                    '<input type="checkbox" scope="{{ table.scope }}" id="{{table.scope}}_{{name}}_{{tdObj.key}}" ',
                                                                        'ng-model="table.colByIndex( table.lists[name].keys.rowsn, table.lists[name].keys.name ).value[tdObj.key]" ng-value="tdObj.key"  ',
                                                                        'ng-change="table.changeByIndex( table.lists[name].keys.rowsn, table.colByIndex(table.lists[name].keys.rowsn, table.lists[name].keys.name) )" ',
                                                                        'ng-disabled="table.colByIndex( table.lists[name].keys.rowsn, table.lists[name].keys.name )==undefined" ',
                                                                    '/>',

                                                                    '<label for="{{table.scope}}_{{name}}_{{tdObj.key}}" title="{{tdObj.desc?tdObj.desc:tdObj.value}}">',
                                                                        '{{ tdObj.value }}',
                                                                    '</label>',

                                                            '</span>',
                                                            '<br ng-if="colnum1>0?(($index+1)%colnum1)==0:false" />',  
                                                        '</span>',                                                  
                                                '</ul>',    
                                            '</li>',
                                        '</ul>',
                                    '</div>',
                            '<span style="display:none" ng-repeat-end></span>',
                            '<span style="display:none" ng-repeat-end></span>',
                        '</div>',    
                    '</div>'
            
                ].join(''),
        controller: function ($scope) {
            $scope.table.lists[$scope.name].keys = $scope.table.lists[$scope.name].keys || {};
            $scope.listFilter = $scope.listFilter || {};
            $scope.change = function(rowsn, name) {
                // $scope.name is  lists[name],   name is colname
                $scope.table.lists[$scope.name].keys.rowsn = rowsn;
                $scope.table.lists[$scope.name].keys.name = name;
            }

            $scope.checkall = function(rowsn, name) {
                $scope.table.colByIndex( rowsn, name ).value = $scope.table.colByIndex( rowsn, name ).value || {};
                for( var key1 in $scope.table.lists[$scope.name].list  ) {
                    var list2 = $scope.table.lists[$scope.name].list[key1].list;
                    for( var key2 in list2) {
                        var list3 = list2[key2].list;
                        for(var key3 in list3) {
                            $scope.table.colByIndex( rowsn, name ).value[ list3[key3].key ] = true;
                        }
                     }
                }
                $scope.table.changeByIndex(rowsn, $scope.table.colByIndex( rowsn, name ));
            }

            $scope.removeall = function(rowsn, name) {
                for( var key in $scope.table.lists[$scope.name].list  ) {
                    $scope.table.colByIndex( rowsn, name ).value = {};
                }
                $scope.table.changeByIndex(rowsn, $scope.table.colByIndex( rowsn, name ));
            }

            $scope.getListFilter = function() {
                $scope.listFilter.key = $scope.listFilter.key?$scope.listFilter.key:""; 
                return $scope.listFilter;
            }

            $scope.valueArr = function(rowsn, name) {
                var ret_arr = [];
                for(var key1 in $scope.table.lists[$scope.name].list) {
                    var list2 = $scope.table.lists[$scope.name].list[key1].list;
                    for(var key2 in list2) {
                        var list3 = list2[key2].list;
                        var valueArr = $.map( list3 , function(n) {
                            if( $scope.table.colByIndex( rowsn, name  )!= undefined  ) {
                                    if( $scope.table.colByIndex( rowsn, name  ).value[n.key] ) 
                                            return n;
                                    else
                                            return null;
                            } else {
                                return null;
                            }
                        });
                        $.merge(ret_arr, valueArr);
                    }
               }
               return ret_arr;
            }
            
        },
        link: function (sc, el, attr) {
            $(function(){
                $(el).wliuDiag({ fade:false, movable: true, title: sc.title});
            });
        }
    }
});

wliu_table.directive("table.checklist3", function () {
    return {
        restrict: "E",
        replace: true,
        scope: {
            table:      "=",
            name:       "@",
            rowsn:      "@",
            colnum:     "@",
            colnum1:    "@",
            bar:        "@",
            title:      "@"
        },
        template: [
                    '<div class="col-md-12" style="border:1px dotted #666666;border-radius:5px;overflow-y:auto;" scope="{{ table.scope }}" ng-hide="table.relationHide(rowsn, name)" ',
                        //'ng-init="table.colByIndex( rowsn, name ).value=$.isPlainObject(table.colByIndex( rowsn, name ).value)?table.colByIndex( rowsn, name ).value:{}"',
                    '>',
                        '<a class="wliu-btn24 wliu-btn24-selectlist" ng-show="bar==1">',
                            '<div class="wliu-selectlist">',
                                '<div class="wliu-selectlist-title info-color text-center">SELECTED</div>',
                                '<ul class="wliu-selectlist-content">',
                                    '<li ng-repeat="vObj in valueArr()">',
                                    '{{ vObj.value }}, ',
                                    '</li>',
                                '</ul>',
                            '</div>',
                        '</a>',
                        '<input type="text" class="wliuCommon-search" ng-model="search" ng-model-options="{ updateOn:\'default blur\', debounce:{default: 500, blur:0} }" ng-show="bar==1" />',
                        '<a class="wliu-btn24 wliu-btn24-checkall" ng-click="checkall()" title="check all" ng-show="bar==1"></a>',
                        '<a class="wliu-btn24 wliu-btn24-removeall" ng-click="removeall()" title="remove all" ng-show="bar==1"></a>',
                        
                        '<select class="wliuCommon-filter" ',
                                'ng-model="listFilter.key" ',
                                'ng-options="sObj.key as sObj.value for sObj in table.lists[table.colMeta(name).list].list" ',                        
                        ' ng-show="bar==1">',
                        '<option value=""></option>',
                        '</select>',
                        '<div class="wliu-underline" ng-show="bar==1"></div>',
                        '<div class="wliu-diag-content" style="min-height:250px;min-width:350px;font-size:14px;">',
                            '<span style="display:none;" ng-repeat-start="bbObj in table.lists[table.colMeta(name).list].list|filter:getListFilter()"></span>',
                            '<span style="display:none;" ng-repeat-start="rdObj in bbObj.list|filter:search"></span>',
                                    '<div class="col-md-{{colnum}} col-sm-{{colnum}} col-xs-12" ng-if="rdObj.list && rdObj.list.length>0">',
                                        '<ul>',
                                            '<li title="{{rdObj.desc?rdObj.desc:rdObj.value}}">',
                                                '<span style="white-space:nowrap;font-weight:700;">{{ rdObj.value }}</span>',
                                                '<ul style="border-top:1px solid #cccccc;">',
                                                        '<span ng-repeat="tdObj in rdObj.list|filter:search">',
                                                            '<span class="checkbox">',
                                                                    '<input type="checkbox" scope="{{ table.scope }}" id="{{table.scope}}_{{name}}_{{rowsn}}_{{tdObj.key}}" ',
                                                                        'ng-model="table.colByIndex( rowsn, name ).value[tdObj.key]" ng-value="tdObj.key"  ',
                                                                        'ng-change="table.changeByIndex( rowsn, table.colByIndex(rowsn, name) )" ',
                                                                        'ng-disabled="table.colByIndex( rowsn, name )==undefined" ',
                                                                    '/>',

                                                                    '<label for="{{table.scope}}_{{name}}_{{rowsn}}_{{tdObj.key}}" title="{{tdObj.desc?tdObj.desc:tdObj.value}}">',
                                                                        '{{ tdObj.value }}',
                                                                    '</label>',

                                                            '</span>',
                                                            '<br ng-if="colnum1>0?(($index+1)%colnum1)==0:false" />',  
                                                        '</span>',                                                  
                                                '</ul>',    
                                            '</li>',
                                        '</ul>',
                                    '</div>',
                            '<span style="display:none" ng-repeat-end></span>',
                            '<span style="display:none" ng-repeat-end></span>',
                        '</div>',    
                    '</div>'
            
                ].join(''),
        controller: function ($scope) {
            $scope.table.lists[$scope.table.colMeta($scope.name).list].keys = $scope.table.lists[$scope.table.colMeta($scope.name).list].keys || {};
            $scope.listFilter = $scope.listFilter || {};

            $scope.checkall = function() {
                $scope.table.colByIndex( $scope.rowsn, $scope.name ).value = $scope.table.colByIndex( $scope.rowsn, $scope.name ).value || {};
                for( var key1 in $scope.table.lists[$scope.table.colMeta($scope.name).list].list ) {
                    var list2 = $scope.table.lists[$scope.table.colMeta($scope.name).list].list[key1].list;
                    for( var key2 in list2) {
                        var list3 = list2[key2].list;
                        for(var key3 in list3) {
                            $scope.table.colByIndex( $scope.rowsn, $scope.name ).value[ list3[key3].key ] = true;
                        }
                     }
                }
                $scope.table.changeByIndex($scope.rowsn, $scope.table.colByIndex( $scope.rowsn, $scope.name ));
            }

            $scope.removeall = function() {
                for( var key in $scope.table.lists[$scope.table.colMeta($scope.name).list].list  ) {
                    $scope.table.colByIndex( $scope.rowsn, $scope.name ).value = {};
                }
                $scope.table.changeByIndex($scope.rowsn, $scope.table.colByIndex( $scope.rowsn, $scope.name ));
            }

            $scope.getListFilter = function() {
                $scope.listFilter.key = $scope.listFilter.key?$scope.listFilter.key:""; 
                return $scope.listFilter;
            }

            $scope.valueArr = function() {
                var ret_arr = [];
                for(var key1 in $scope.table.lists[$scope.table.colMeta($scope.name).list].list) {
                    var list2 = $scope.table.lists[$scope.table.colMeta($scope.name).list].list[key1].list;
                    for(var key2 in list2) {
                        var list3 = list2[key2].list;
                        var valueArr = $.map( list3 , function(n) {
                            if( $scope.table.colByIndex( $scope.rowsn, $scope.name )!= undefined  ) {
                                    if( $scope.table.colByIndex( $scope.rowsn, $scope.name ).value[n.key] ) 
                                            return n;
                                    else
                                            return null;
                            } else {
                                return null;
                            }
                        });
                        $.merge(ret_arr, valueArr);
                    }
               }
               return ret_arr;
            }
            
        },
        link: function (sc, el, attr) {
        }
    }
});

wliu_table.directive("table.radio", function () {
    return {
        restrict: "E",
        replace: true,
        scope: {
            table:      "=",
            rowsn:      "@",
            colnum:     "@",
            name:       "@",
            tooltip:    "@"
        },
        template: [
                    '<div scope="{{ table.scope }}" ng-hide="table.relationHide(rowsn, name)" ',
                        'ng-class="{ \'wliuCommon-input-invalid\': table.colByIndex(rowsn, name).errorCode }" ',
                        'wliu-popup popup-target="{{tooltip?table.tooltip:\'\'}}" popup-toggle="hover" popup-content="{{table.colByIndex(rowsn, name).errorCode?table.colByIndex(rowsn, name).errorMessage.nl2br():table.colMeta(name).coldesc?table.colMeta(name).coldesc:table.colMeta(name).colname}}" ',
                        'title="{{tooltip?\'\':table.colByIndex(rowsn, name).errorCode?table.colByIndex(rowsn, name).errorMessage:table.colMeta(name).coldesc?table.colMeta(name).coldesc:table.colMeta(name).colname}}" ',
                    '>',
                        '<span ',
                            //'ng-init="table.colByIndex(rowsn, name).value=table.colByIndex(rowsn, name).value?table.colByIndex(rowsn, name).value:{};" ',                          
                            'ng-repeat="rdObj in table.lists[table.colMeta(name).list].list">',
                                '<span class="radio">',

                                        '<input type="radio"  scope="{{ table.scope }}" id="{{table.scope}}_{{name}}_{{rowsn}}_{{rdObj.key}}" ',
                                            'ng-model="table.colByIndex(rowsn, name).value" ng-value="rdObj.key"  ',
                                            'ng-change="table.changeByIndex(rowsn, table.colByIndex(rowsn, name))" ',
                                            'ng-disabled="table.colByIndex(rowsn, name)==undefined" ',
                                        '/>',

                                        '<label scope="{{ table.scope }}" for="{{table.scope}}_{{name}}_{{rowsn}}_{{rdObj.key}}" title="{{rdObj.desc?rdObj.desc:rdObj.value}}">',
                                            //'<abbr title="{{rdObj.desc}}" ng-if="rdObj.desc!=\'\'">{{ rdObj.value }}</abbr>',
                                            '{{ rdObj.value }}',
                                        '</label>',

                                '</span>',
                                '<br ng-if="colnum>0?(($index+1)%colnum)==0:false" />',
                        '</span>',
                    '</div>'
                ].join(''),
        controller: function ($scope) {
        },
        link: function (sc, el, attr) {
        }
    }
});

wliu_table.directive("table.radio1", function () {
    return {
        restrict: "E",
        replace: true,
        scope: {
            table:      "=",
            rowsn:      "@",
            name:       "@",
            targetid:   "@",
            tooltip:    "@"
        },
        template: [
                        '<input  type="text" readonly scope="{{ table.scope }}" class="wliuCommon-radiolist" value="{{ valueText() }}" ng-hide="table.relationHide(rowsn, name)" ',
                                'ng-click="change(rowsn, name)" ',
                                'ng-class="{ \'wliuCommon-input-invalid\': table.colByIndex(rowsn, name).errorCode }" ',

                                'wliu-diag  diag-target="{{targetid}}" diag-toggle="click" ',
                                'wliu-popup popup-target="{{tooltip?table.tooltip:\'\'}}" popup-toggle="hover" popup-content="{{table.colByIndex(rowsn, name).errorCode?table.colByIndex(rowsn, name).errorMessage.nl2br():valueText()?valueText():table.colMeta(name).coldesc?table.colMeta(name).coldesc:table.colMeta(name).colname}}" ',
                                'title="{{tooltip?\'\':table.colByIndex(rowsn, name).errorCode?table.colByIndex(rowsn, name).errorMessage:valueText()?valueText():table.colMeta(name).coldesc?table.colMeta(name).coldesc:table.colMeta(name).colname}}" ',
                        '/>',
                ].join(''),
        controller: function ($scope) {
            $scope.table.lists[ $scope.table.colMeta($scope.name).list ].keys = $scope.table.lists[ $scope.table.colMeta($scope.name).list ].keys || {};
            $scope.change = function(rowsn, name) {
                $scope.table.lists[ $scope.table.colMeta($scope.name).list ].keys.rowsn = rowsn;
                $scope.table.lists[ $scope.table.colMeta($scope.name).list ].keys.name = name;
            }
            $scope.valueText = function() {
                var val =  $scope.table.colByIndex( $scope.rowsn, $scope.name  )?$scope.table.colByIndex( $scope.rowsn, $scope.name ).value:"";
                var valueText = FUNC.ARRAY.Single( $scope.table.lists[$scope.table.colMeta($scope.name).list].list, {key:val} )?FUNC.ARRAY.Single( $scope.table.lists[$scope.table.colMeta($scope.name).list].list, {key:val} ).value:"";
                return valueText;
            }
        },
        link: function (sc, el, attr) {
        }
    }
});

wliu_table.directive("table.radiodiag1", function () {
    return {
        restrict: "E",
        replace: true,
        scope: {
            table:      "=",
            name:       "@",
            targetid:   "@",
            colnum:     "@",
            bar:        "@", 
            title:      "@"
        },
        template: [
                    '<div id="{{targetid}}" class="wliu-diag" scope="{{ table.scope }}">',
                        '<a class="wliu-btn24 wliu-btn24-selectlist" ng-show="bar==1">',
                            '<div class="wliu-selectlist">',
                                '<div class="wliu-selectlist-title">Selected Items</div>',
                                '<ul class="wliu-selectlist-content">',
                                    '{{ valueText(table.lists[name].keys.rowsn, table.lists[name].keys.name) }}',
                                '</ul>',
                            '</div>',
                        '</a>',
                        '<input type="text" class="wliuCommon-search" ng-model="search" ng-model-options="{ updateOn:\'default blur\', debounce:{default: 500, blur:0} }" ng-show="bar==1" />',
                        '<div class="wliu-underline" ng-show="bar==1"></div>',
                        '<div class="wliu-diag-content" style="font-size:14px;">',
                        '<span ',
                            'ng-repeat="rdObj in table.lists[name].list|filter:search">',
                                '<span class="radio">',

                                        '<input type="radio" scope="{{ table.scope }}" name="{{table.scope}}_{{name}}_{{table.lists[name].keys.name}}" id="{{table.scope}}_{{name}}_{{table.lists[name].keys.name}}_{{rdObj.key}}" ',
                                            'ng-model="table.colByIndex( table.lists[name].keys.rowsn, table.lists[name].keys.name ).value" ng-value="rdObj.key"  ',
                                            'ng-change="table.changeByIndex( table.lists[name].keys.rowsn, table.colByIndex(table.lists[name].keys.rowsn, table.lists[name].keys.name) )" ',
                                            'ng-disabled="table.colByIndex( table.lists[name].keys.rowsn, table.lists[name].keys.name )==undefined" ',
                                        '/>',

                                        '<label for="{{table.scope}}_{{name}}_{{table.lists[name].keys.name}}_{{rdObj.key}}" title="{{rdObj.desc?rdObj.desc:rdObj.value}}">',
                                            '{{ rdObj.value }}',
                                        '</label>',

                                '</span>',
                                '<br ng-if="colnum>0?(($index+1)%colnum)==0:false" />',
                        '</span>',
                        '</div>',    
                    '</div>'
            
                ].join(''),
        controller: function ($scope) {
            $scope.table.lists[$scope.name].keys = $scope.table.lists[$scope.name].keys || {};

            $scope.valueText = function(rowsn, name) {
                var val =  $scope.table.colByIndex( rowsn, name  )?$scope.table.colByIndex( rowsn, name  ).value:"";
                var valueText = FUNC.ARRAY.Single( $scope.table.lists[$scope.name].list, {key:val} )?FUNC.ARRAY.Single( $scope.table.lists[$scope.name].list, {key:val} ).value:"";
                return valueText;
            }
            
        },
        link: function (sc, el, attr) {
            $(function(){
                $(el).wliuDiag({ fade:false, movable: true, title: sc.title});
            });
        }
    }
});

wliu_table.directive("table.radiolist1", function () {
    return {
        restrict: "E",
        replace: true,
        scope: {
            table:      "=",
            name:       "@",
            rowsn:      "@",
            colnum:     "@",
            bar:        "@", 
            title:      "@"
        },
        template: [
                    '<div class="col-md-12" style="border:1px dotted #666666;border-radius:5px; padding:2px; overflow-y:auto;text-align:left; min-width:240px;" scope="{{ table.scope }}" ng-hide="table.relationHide(rowsn, name)">',
                        '<a class="wliu-btn24 wliu-btn24-selectlist" ng-show="bar==1">',
                            '<div class="wliu-selectlist">',
                                '<div class="wliu-selectlist-title">Selected Items</div>',
                                '<ul class="wliu-selectlist-content">',
                                    '{{ valueText() }}',
                                '</ul>',
                            '</div>',
                        '</a>',
                        '<input type="text" class="wliuCommon-search" ng-model="search" ng-model-options="{ updateOn:\'default blur\', debounce:{default: 500, blur:0} }" ng-show="bar==1" />',
                        '<div class="wliu-underline" ng-show="bar==1"></div>',
                        '<div class="wliu-diag-content" style="font-size:14px;">',
                        '<span ',
                            'ng-repeat="rdObj in table.lists[table.colMeta(name).list].list|filter:search">',
                                '<span class="radio">',

                                        '<input type="radio" scope="{{ table.scope }}" name="{{table.scope}}_{{name}}_{{rowsn}}" id="{{table.scope}}_{{name}}_{{rowsn}}_{{rdObj.key}}" ',
                                            'ng-model="table.colByIndex( rowsn, name ).value" ng-value="rdObj.key"  ',
                                            'ng-change="table.changeByIndex( rowsn, table.colByIndex(rowsn, name) )" ',
                                            'ng-disabled="table.colByIndex( rowsn, name )==undefined" ',
                                        '/>',

                                        '<label for="{{table.scope}}_{{name}}_{{rowsn}}_{{rdObj.key}}" title="{{rdObj.desc?rdObj.desc:rdObj.value}}">',
                                            '{{ rdObj.value }}',
                                        '</label>',

                                '</span>',
                                '<br ng-if="colnum>0?(($index+1)%colnum)==0:false" />',
                        '</span>',
                        '</div>',    
                    '</div>'
            
                ].join(''),
        controller: function ($scope) {
            $scope.valueText = function() {
                var val =  $scope.table.colByIndex( $scope.rowsn, $scope.name  )?$scope.table.colByIndex( $scope.rowsn, $scope.name  ).value:"";
                var valueText = FUNC.ARRAY.Single( $scope.table.lists[$scope.table.colMeta($scope.name).list].list, {key:val} )?FUNC.ARRAY.Single( $scope.table.lists[$scope.table.colMeta($scope.name).list].list, {key:val} ).value:"";
                return valueText;
            }
            
        },
        link: function (sc, el, attr) {
        }
    }
});

wliu_table.directive("table.radio2", function () {
    return {
        restrict: "E",
        replace: true,
        scope: {
            table:      "=",
            rowsn:      "@",
            name:       "@",
            targetid:   "@",
            tooltip:    "@"
        },
        template: [
                        '<input type="text" readonly scope="{{ table.scope }}" class="wliuCommon-radiolist" value="{{ valueText() }}" ng-hide="table.relationHide(rowsn, name)" ',
                                'ng-click="change(rowsn, name)" ',
                                'ng-class="{ \'wliuCommon-input-invalid\': table.colByIndex(rowsn, name).errorCode }" ',

                                'wliu-diag  diag-target="{{targetid}}" diag-toggle="click" ',
                                'wliu-popup popup-target="{{tooltip?table.tooltip:\'\'}}" popup-toggle="hover" popup-content="{{table.colByIndex(rowsn, name).errorCode?table.colByIndex(rowsn, name).errorMessage.nl2br():valueText()?valueText():table.colMeta(name).coldesc?table.colMeta(name).coldesc:table.colMeta(name).colname}}" ',
                                'title="{{tooltip?\'\':table.colByIndex(rowsn, name).errorCode?table.colByIndex(rowsn, name).errorMessage:valueText()?valueText():table.colMeta(name).coldesc?table.colMeta(name).coldesc:table.colMeta(name).colname}}" ',
                        '/>'
                ].join(''),
        controller: function ($scope) {
            $scope.table.lists[ $scope.table.colMeta($scope.name).list ].keys = $scope.table.lists[ $scope.table.colMeta($scope.name).list ].keys || {};
            $scope.change = function(rowsn, name) {
                $scope.table.lists[ $scope.table.colMeta($scope.name).list ].keys.rowsn = rowsn;
                $scope.table.lists[ $scope.table.colMeta($scope.name).list ].keys.name = name;
            }
            $scope.valueText = function() {
                var ret_text = "";
                for(var key in $scope.table.lists[$scope.table.colMeta($scope.name).list].list) {
                    var dList = $scope.table.lists[$scope.table.colMeta($scope.name).list].list[key].list;
                    var text = $.map( dList , function(n) {
                        if($scope.table.colByIndex( $scope.rowsn, $scope.name )!=undefined) {
                            if($scope.table.colByIndex( $scope.rowsn, $scope.name ).value == n.key) 
                                    return n.value;
                            else
                                    return null;
                        } else {
                            return null;
                        }

                    }).join("; ");
                    ret_text += text;
                }
                return ret_text;
            }
        },
        link: function (sc, el, attr) {
        }
    }
});

wliu_table.directive("table.radiodiag2", function () {
    return {
        restrict: "E",
        replace: true,
        scope: {
            table:      "=",
            name:       "@",
            targetid:   "@",
            colnum:     "@",
            colnum1:    "@",
            bar:        "@",
            title:      "@"
        },
        template: [
                    '<div id="{{targetid}}" class="wliu-diag container" scope="{{ table.scope }}">',
                        '<a class="wliu-btn24 wliu-btn24-selectlist" ng-show="bar==1">',
                            '<div class="wliu-selectlist">',
                                '<div class="wliu-selectlist-title">Selected Items</div>',
                                '<ul class="wliu-selectlist-content">',
                                    '<li ng-repeat="vObj in valueArr(table.lists[name].keys.rowsn, table.lists[name].keys.name)">',
                                    '{{ vObj.value }}',
                                    '</li>',
                                '</ul>',
                            '</div>',
                        '</a>',
                        '<input type="text" class="wliuCommon-search" ng-model="search" ng-model-options="{ updateOn:\'default blur\', debounce:{default: 500, blur:0} }" ng-show="bar==1" />',
                        '<div class="wliu-underline" ng-show="bar==1"></div>',
                        '<div class="wliu-diag-content" style="font-size:14px;">',
                            '<span style="display:none;" ng-repeat-start="rdObj in table.lists[name].list|filter:search"></span>',
                                    '<div class="col-md-{{colnum}} col-sm-{{colnum}} col-xs-12" ng-if="rdObj.list && rdObj.list.length>0">',
                                        '<ul>',
                                            '<li title="{{rdObj.desc?rdObj.desc:rdObj.value}}">',
                                                '<b>{{ rdObj.value }}</b>',
                                                '<ul style="border-top:1px solid #cccccc;">',
                                                        '<span ng-repeat="tdObj in rdObj.list|filter:search">',
                                                            '<span class="radio">',
                                                                    '<input type="radio" scope="{{ table.scope }}" name="{{table.scope}}_{{name}}_{{table.lists[name].keys.name}}" id="{{table.scope}}_{{name}}_{{table.lists[name].keys.name}}_{{tdObj.key}}" ',
                                                                        'ng-model="table.colByIndex( table.lists[name].keys.rowsn, table.lists[name].keys.name ).value" ng-value="tdObj.key"  ',
                                                                        'ng-change="table.changeByIndex( table.lists[name].keys.rowsn, table.colByIndex(table.lists[name].keys.rowsn, table.lists[name].keys.name) )" ',
                                                                        'ng-disabled="table.colByIndex( table.lists[name].keys.rowsn, table.lists[name].keys.name )==undefined" ',
                                                                    '/>',

                                                                    '<label for="{{table.scope}}_{{name}}_{{table.lists[name].keys.name}}_{{tdObj.key}}" title="{{tdObj.desc?tdObj.desc:tdObj.value}}">',
                                                                        '{{ tdObj.value }}',
                                                                    '</label>',

                                                            '</span>',
                                                            '<br ng-if="colnum1>0?(($index+1)%colnum1)==0:false" />',  
                                                        '</span>',                                                  
                                                '</ul>',    
                                            '</li>',
                                        '</ul>',
                                    '</div>',
                            '<span style="display:none;" ng-repeat-end></span>',
                        '</div>',    
                    '</div>'
            
                ].join(''),
        controller: function ($scope) {
            $scope.table.lists[$scope.name].keys = $scope.table.lists[$scope.name].keys || {};

            $scope.valueArr = function(rowsn, name) {
                var ret_arr = [];
                for(var key in $scope.table.lists[$scope.name].list) {
                    var dList = $scope.table.lists[$scope.name].list[key].list;
                    var valueArr = $.map( dList , function(n) {
                        if( $scope.table.colByIndex( rowsn, name  )!= undefined  ) {
                                if( $scope.table.colByIndex( rowsn, name  ).value == n.key ) 
                                        return n;
                                else
                                        return null;
                        } else {
                            return null;
                        }
                    });
                    $.merge(ret_arr, valueArr);
               }
               return ret_arr;
            }
            
        },
        link: function (sc, el, attr) {
            $(function(){
                $(el).wliuDiag({ fade:false, movable: true, title: sc.title});
            });
        }
    }
});

wliu_table.directive("table.radiolist2", function () {
    return {
        restrict: "E",
        replace: true,
        scope: {
            table:      "=",
            name:       "@",
            rowsn:      "@",
            colnum:     "@",
            colnum1:    "@",
            bar:        "@",
            title:      "@"
        },
        template: [
                    '<div class="col-md-12" style="border:1px dotted #666666;border-radius:5px;overflow-y:auto;" scope="{{ table.scope }}" ng-hide="table.relationHide(rowsn, name)">',
                        '<a class="wliu-btn24 wliu-btn24-selectlist" ng-show="bar==1">',
                            '<div class="wliu-selectlist">',
                                '<div class="wliu-selectlist-title">Selected Items</div>',
                                '<ul class="wliu-selectlist-content">',
                                    '<li ng-repeat="vObj in valueArr()">',
                                    '{{ vObj.value }}',
                                    '</li>',
                                '</ul>',
                            '</div>',
                        '</a>',
                        '<input type="text" class="wliuCommon-search" ng-model="search" ng-model-options="{ updateOn:\'default blur\', debounce:{default: 500, blur:0} }" ng-show="bar==1" />',
                        '<div class="wliu-underline" ng-show="bar==1"></div>',
                        '<div class="wliu-diag-content" style="font-size:14px;">',
                            '<span style="display:none;" ng-repeat-start="rdObj in table.lists[table.colMeta(name).list].list|filter:search"></span>',
                                    '<div class="col-md-{{colnum}} col-sm-{{colnum}} col-xs-12" ng-if="rdObj.list && rdObj.list.length>0">',
                                        '<ul>',
                                            '<li title="{{rdObj.desc?rdObj.desc:rdObj.value}}">',
                                                '<b>{{ rdObj.value }}</b>',
                                                '<ul style="border-top:1px solid #cccccc;">',
                                                        '<span ng-repeat="tdObj in rdObj.list|filter:search">',
                                                            '<span class="radio">',
                                                                    '<input type="radio" scope="{{ table.scope }}" name="{{table.scope}}_{{name}}_{{rowsn}}" id="{{table.scope}}_{{name}}_{{rowsn}}_{{tdObj.key}}" ',
                                                                        'ng-model="table.colByIndex( rowsn, name ).value" ng-value="tdObj.key"  ',
                                                                        'ng-change="table.changeByIndex( rowsn, table.colByIndex(rowsn, name) )" ',
                                                                        'ng-disabled="table.colByIndex( rowsn, name )==undefined" ',
                                                                    '/>',

                                                                    '<label for="{{table.scope}}_{{name}}_{{rowsn}}_{{tdObj.key}}" title="{{tdObj.desc?tdObj.desc:tdObj.value}}">',
                                                                        '{{ tdObj.value }}',
                                                                    '</label>',

                                                            '</span>',
                                                            '<br ng-if="colnum1>0?(($index+1)%colnum1)==0:false" />',  
                                                        '</span>',                                                  
                                                '</ul>',    
                                            '</li>',
                                        '</ul>',
                                    '</div>',
                            '<span style="display:none;" ng-repeat-end></span>',
                        '</div>',    
                    '</div>'
            
                ].join(''),
        controller: function ($scope) {
            $scope.valueArr = function() {
                var ret_arr = [];
                for(var key in $scope.table.lists[$scope.table.colMeta($scope.name).list].list) {
                    var dList = $scope.table.lists[$scope.table.colMeta($scope.name).list].list[key].list;
                    var valueArr = $.map( dList , function(n) {
                        if( $scope.table.colByIndex( $scope.rowsn, $scope.name  )!= undefined  ) {
                                if( $scope.table.colByIndex( $scope.rowsn, $scope.name  ).value == n.key ) 
                                        return n;
                                else
                                        return null;
                        } else {
                            return null;
                        }
                    });
                    $.merge(ret_arr, valueArr);
               }
               return ret_arr;
            }
            
        },
        link: function (sc, el, attr) {
        }
    }
});

wliu_table.directive("table.radio3", function () {
    return {
        restrict: "E",
        replace: true,
        scope: {
            table:      "=",
            rowsn:      "@",
            name:       "@",
            targetid:   "@",
            tooltip:    "@"
        },
        template: [
                    '<input type="text" readonly scope="{{ table.scope }}" class="wliuCommon-radiolist" value="{{ valueText() }}" ng-hide="table.relationHide(rowsn, name)" ',
                            'ng-click="change(rowsn, name)" ',
                            'ng-class="{ \'wliuCommon-input-invalid\': table.colByIndex(rowsn, name).errorCode }" ',

                            'wliu-diag  diag-target="{{targetid}}" diag-toggle="click" ',
                            'wliu-popup popup-target="{{tooltip?table.tooltip:\'\'}}" popup-toggle="hover" popup-content="{{table.colByIndex(rowsn, name).errorCode?table.colByIndex(rowsn, name).errorMessage.nl2br():valueText()?valueText():table.colMeta(name).coldesc?table.colMeta(name).coldesc:table.colMeta(name).colname}}" ',
                            'title="{{tooltip?\'\':table.colByIndex(rowsn, name).errorCode?table.colByIndex(rowsn, name).errorMessage:valueText()?valueText():table.colMeta(name).coldesc?table.colMeta(name).coldesc:table.colMeta(name).colname}}" ',
                    '/>'
                ].join(''),
        controller: function ($scope) {
            $scope.table.lists[ $scope.table.colMeta($scope.name).list ].keys = $scope.table.lists[ $scope.table.colMeta($scope.name).list ].keys || {};
            $scope.change = function(rowsn, name) {
                $scope.table.lists[ $scope.table.colMeta($scope.name).list ].keys.rowsn = rowsn;
                $scope.table.lists[ $scope.table.colMeta($scope.name).list ].keys.name = name;
            }
            $scope.valueText = function() {
                var ret_text = "";
                for(var key in $scope.table.lists[$scope.table.colMeta($scope.name).list].list) {
                    var dList = $scope.table.lists[$scope.table.colMeta($scope.name).list].list[key].list;
                    for(var pkey in dList) {
                        var pList = dList[pkey].list;
                        var text = $.map( pList , function(n) {
                            if( $scope.table.colByIndex( $scope.rowsn, $scope.name )!=undefined ) {
                                if($scope.table.colByIndex( $scope.rowsn, $scope.name ).value==n.key) 
                                        return n.value;
                                else
                                        return null;
                            } else {
                                return null;
                            }

                        }).join("; ");
                        ret_text += text;
                    }
                }
                return ret_text;
            }
        },
        link: function (sc, el, attr) {
        }
    }
});

wliu_table.directive("table.radiodiag3", function () {
    return {
        restrict: "E",
        replace: true,
        scope: {
            table:      "=",
            name:       "@",
            targetid:   "@",
            colnum:     "@",
            colnum1:    "@",
            bar:        "@",
            title:      "@"
        },
        template: [
                    '<div id="{{targetid}}" class="wliu-diag container" scope="{{ table.scope }}">',
                        '<a class="wliu-btn24 wliu-btn24-selectlist" ng-show="bar==1">',
                            '<div class="wliu-selectlist">',
                                '<div class="wliu-selectlist-title">Selected Items</div>',
                                '<ul class="wliu-selectlist-content">',
                                    '<li ng-repeat="vObj in valueArr(table.lists[name].keys.rowsn, table.lists[name].keys.name)">',
                                    '{{ vObj.value }}',
                                    '</li>',
                                '</ul>',
                            '</div>',
                        '</a>',
                        '<input type="text" class="wliuCommon-search" ng-model="search" ng-model-options="{ updateOn:\'default blur\', debounce:{default: 500, blur:0} }" ng-show="bar==1" />',
                        '<select class="wliuCommon-filter" ',
                                'ng-model="listFilter.key" ',
                                'ng-options="sObj.key as sObj.value for sObj in table.lists[name].list" ',                        
                        ' ng-show="bar==1">',
                        '<option value=""></option>',
                        '</select>',
                        '<div class="wliu-underline" ng-show="bar==1"></div>',
                        '<div class="wliu-diag-content" style="font-size:14px;">',
                            '<span style="display:none;" ng-repeat-start="bbObj in table.lists[name].list|filter:getListFilter()"></span>',
                            '<span style="display:none;" ng-repeat-start="rdObj in bbObj.list|filter:search"></span>',
                                    '<div class="col-md-{{colnum}} col-sm-{{colnum}} col-xs-12" ng-if="rdObj.list && rdObj.list.length>0">',
                                        '<ul>',
                                            '<li title="{{rdObj.desc?rdObj.desc:rdObj.value}}">',
                                                '<b>{{ rdObj.value }}</b>',
                                                '<ul style="border-top:1px solid #cccccc;">',
                                                        '<span ng-repeat="tdObj in rdObj.list|filter:search">',
                                                            '<span class="radio">',
                                                                    '<input type="radio" scope="{{ table.scope }}" name="{{table.scope}}_{{name}}_{{table.lists[name].keys.name}}" id="{{table.scope}}_{{name}}_{{table.lists[name].keys.name}}_{{tdObj.key}}" ',
                                                                        'ng-model="table.colByIndex( table.lists[name].keys.rowsn, table.lists[name].keys.name ).value" ng-value="tdObj.key"  ',
                                                                        'ng-change="table.changeByIndex( table.lists[name].keys.rowsn, table.colByIndex(table.lists[name].keys.rowsn, table.lists[name].keys.name) )" ',
                                                                        'ng-disabled="table.colByIndex( table.lists[name].keys.rowsn, table.lists[name].keys.name )==undefined" ',
                                                                    '/>',

                                                                    '<label for="{{table.scope}}_{{name}}_{{table.lists[name].keys.name}}_{{tdObj.key}}" title="{{tdObj.desc?tdObj.desc:tdObj.value}}">',
                                                                        '{{ tdObj.value }}',
                                                                    '</label>',

                                                            '</span>',
                                                            '<br ng-if="colnum1>0?(($index+1)%colnum1)==0:false" />',  
                                                        '</span>',                                                  
                                                '</ul>',    
                                            '</li>',
                                        '</ul>',
                                    '</div>',
                            '<span style="display:none" ng-repeat-end></span>',
                            '<span style="display:none" ng-repeat-end></span>',
                        '</div>',    
                    '</div>'
            
                ].join(''),
        controller: function ($scope) {
            $scope.listFilter = $scope.listFilter || {};
            $scope.getListFilter = function() {
                $scope.listFilter.key = $scope.listFilter.key?$scope.listFilter.key:""; 
                return $scope.listFilter;
            }

            $scope.valueArr = function(rowsn, name) {
                var ret_arr = [];
                for(var key in $scope.table.lists[$scope.name].list) {
                    var dList = $scope.table.lists[$scope.name].list[key].list;
                    var valueArr = $.map( dList , function(n) {
                        if( $scope.table.colByIndex( rowsn, name  )!= undefined  ) {
                                if( $scope.table.colByIndex( rowsn, name  ).value == n.key ) 
                                        return n;
                                else
                                        return null;
                        } else {
                            return null;
                        }
                    });
                    $.merge(ret_arr, valueArr);
               }
               return ret_arr;
            }
            
        },
        link: function (sc, el, attr) {
            $(function(){
                $(el).wliuDiag({ fade:false, movable: true, title: sc.title});
            });
        }
    }
});

wliu_table.directive("table.radiolist3", function () {
    return {
        restrict: "E",
        replace: true,
        scope: {
            table:      "=",
            name:       "@",
            rowsn:      "@",
            colnum:     "@",
            colnum1:    "@",
            bar:        "@",
            title:      "@"
        },
        template: [
                    '<div class="col-md-12" style="border:1px dotted #666666;border-radius:5px;overflow-y:auto;" scope="{{ table.scope }}" ng-hide="table.relationHide(rowsn, name)">',
                        '<a class="wliu-btn24 wliu-btn24-selectlist" ng-show="bar==1">',
                            '<div class="wliu-selectlist">',
                                '<div class="wliu-selectlist-title">Selected Items</div>',
                                '<ul class="wliu-selectlist-content">',
                                    '<li ng-repeat="vObj in valueArr()">',
                                    '{{ vObj.value }}',
                                    '</li>',
                                '</ul>',
                            '</div>',
                        '</a>',
                        '<input type="text" class="wliuCommon-search" ng-model="search" ng-model-options="{ updateOn:\'default blur\', debounce:{default: 500, blur:0} }"  ng-show="bar==1" />',
                        '<select class="wliuCommon-filter" ',
                                'ng-model="listFilter.key" ',
                                'ng-options="sObj.key as sObj.value for sObj in table.lists[table.colMeta(name).list].list" ',                        
                        ' ng-show="bar==1">',
                        '<option value=""></option>',
                        '</select>',
                        '<div class="wliu-underline" ng-show="bar==1"></div>',
                        '<div class="wliu-diag-content" style="font-size:14px;">',
                            '<span style="display:none;" ng-repeat-start="bbObj in table.lists[table.colMeta(name).list].list|filter:getListFilter()"></span>',
                            '<span style="display:none;" ng-repeat-start="rdObj in bbObj.list|filter:search"></span>',
                                    '<div class="col-md-{{colnum}} col-sm-{{colnum}} col-xs-12" ng-if="rdObj.list && rdObj.list.length>0">',
                                        '<ul>',
                                            '<li title="{{rdObj.desc?rdObj.desc:rdObj.value}}">',
                                                '<b>{{ rdObj.value }}</b>',
                                                '<ul style="border-top:1px solid #cccccc;">',
                                                        '<span ng-repeat="tdObj in rdObj.list|filter:search">',
                                                            '<span class="radio">',
                                                                    '<input type="radio" scope="{{ table.scope }}" name="{{table.scope}}_{{name}}_{{rowsn}}" id="{{table.scope}}_{{name}}_{{rowsn}}_{{tdObj.key}}" ',
                                                                        'ng-model="table.colByIndex( rowsn, name ).value" ng-value="tdObj.key"  ',
                                                                        'ng-change="table.changeByIndex( rowsn, table.colByIndex(rowsn, name) )" ',
                                                                        'ng-disabled="table.colByIndex( rowsn, name )==undefined" ',
                                                                    '/>',

                                                                    '<label for="{{table.scope}}_{{name}}_{{rowsn}}_{{tdObj.key}}" title="{{tdObj.desc?tdObj.desc:tdObj.value}}">',
                                                                        '{{ tdObj.value }}',
                                                                    '</label>',

                                                            '</span>',
                                                            '<br ng-if="colnum1>0?(($index+1)%colnum1)==0:false" />',  
                                                        '</span>',                                                  
                                                '</ul>',    
                                            '</li>',
                                        '</ul>',
                                    '</div>',
                            '<span style="display:none" ng-repeat-end></span>',
                            '<span style="display:none" ng-repeat-end></span>',
                        '</div>',    
                    '</div>'
            
                ].join(''),
        controller: function ($scope) {
            $scope.table.lists[$scope.table.colMeta($scope.name).list].keys = $scope.table.lists[$scope.table.colMeta($scope.name).list].keys || {};
            $scope.listFilter = $scope.listFilter || {};

            $scope.getListFilter = function() {
                $scope.listFilter.key = $scope.listFilter.key?$scope.listFilter.key:""; 
                return $scope.listFilter;
            }

            $scope.valueArr = function() {
                var ret_arr = [];
                for(var key in $scope.table.lists[$scope.table.colMeta($scope.name).list].list) {
                    var dList = $scope.table.lists[$scope.table.colMeta($scope.name).list].list[key].list;
                    var valueArr = $.map( dList , function(n) {
                        if( $scope.table.colByIndex( $scope.rowsn, $scope.name  )!= undefined  ) {
                                if( $scope.table.colByIndex( $scope.rowsn, $scope.name  ).value == n.key ) 
                                        return n;
                                else
                                        return null;
                        } else {
                            return null;
                        }
                    });
                    $.merge(ret_arr, valueArr);
               }
               return ret_arr;
            }
            
        },
        link: function (sc, el, attr) {
        }
    }
});

wliu_table.directive("table.bgroup", function () {
    return {
        restrict:   "E",
        replace:    true,
        transclude: true,           
        scope: {
            table:      "=",
            rowsn:      "@",
            actname:    "@"
        },
        template: [
                    '<div class="dropdown" style="white-space:nowrap;">',
                        '<button scope="{{ table.scope }} class="btn btn-primary btn-sm dropdown-toggle" type="button" data-toggle="dropdown" ',
                         'style="font-size:0.8em;" ',
                         'ng-class="{\'btn-info\': table.rowByIndex(rowsn).rowstate==0, \'btn-warning\': table.rowByIndex(rowsn).rowstate!=0}"',
                         '>',
                            '{{actname}} ',
                            '<i class="fa fa-1 fa-caret-down"></i>',
                        '</button>',
                        '<ul class="dropdown-menu" style="white-space:nowrap;" ng-transclude>',
                        '</ul>',
                    '</div>'
                ].join(''),
        controller: function ($scope) {
        },
        link: function (sc, el, attr) {
        }
    }
});

wliu_table.directive("table.next", function (wliuTableService) {
    return {
        restrict: "E",
        replace: true,
        scope: {
            table:      "=",
            name:       "@",
            actname:    "@",
            action:     "&"
        },
        template: [
                    '<span>',
                        '<button class="btn btn-outline-primary waves-effect" ',
                            'ng-click="naviRecord()" ',
                            'ng-if="table.rowno()<table.rows.length-1 && table.rows.length>0 && table.rowno()>=0"',
                        '>',
                            '{{actname?actname:name}}',
                        '</button>',
                    '</span>'
                ].join(''),
        controller: function ($scope) {
            $scope.naviRecord = function() {
                // add you code here 
                $scope.table.nextRecord();
                // end of code
                $scope.action(); // trigger outside event
            }
        },
        link: function (sc, el, attr) {
        }
    }
});

wliu_table.directive("table.previous", function (wliuTableService) {
    return {
        restrict: "E",
        replace: true,
        scope: {
            table:      "=",
            name:       "@",
            actname:    "@",
            action:     "&"
        },
        template: [
                    '<span>',
                        '<button class="btn btn-outline-primary waves-effect" ',
                            'ng-click="naviRecord()" ',
                            'ng-if="table.rows.length>0 && table.rowno()>0"',
                        '>',
                            '{{actname?actname:name}}',
                        '</button>',
                    '</span>'
                ].join(''),
        controller: function ($scope) {
            $scope.naviRecord = function() {
                // add you code here 
                $scope.table.previousRecord();
                // end of code
                $scope.action(); // trigger outside event
            }
        },
        link: function (sc, el, attr) {
        }
    }
});

wliu_table.directive("table.blink", function (wliuTableService) {
    return {
        restrict: "E",
        replace: true,
        scope: {
            table:      "=",
            rowsn:      "@",
            name:       "@",
            actname:    "@",
            action:     "&"
        },
        template: [
                    '<span><a href="javascript:void(0);" class="wliuCommon-table-btn16" scope="{{ table.scope }}" ',
                        'title="{{table.colMeta(name).coldesc?table.colMeta(name).coldesc:table.colMeta(name).colname}}"',
                        'ng-click="action1(table.rowByIndex(rowsn))" ',
                         'ng-if="buttonState(name, table.rowByIndex(rowsn).rowstate)"',
                    '>',
                    '<i class="wliu-btn16 wliu-btn16-{{name}}"></i> ',
                    '<span style="vertical-align:middle;">{{actname}}</span>',
                    '</a></span>'
                ].join(''),
        controller: function ($scope) {
            $scope.action1 = function(theRow) {
                // add you code here 
                switch( $scope.name.toLowerCase() ) {
                    case "detail":
                        $scope.table.rownoByRow(theRow);
                        break;
                    case "save":
                        $scope.table.saveRow(theRow);
                        break;
                    case "cancel":
                        $scope.table.cancelRow(theRow);

                        // ckeditor  reset value to old value;  due to single way sync 
                        for(var cidx in $scope.table.cols) {
                            if( $scope.table.cols[cidx].coltype.toLowerCase() == "ckeditor" )
                                if(CKEDITOR.instances[$scope.table.scope + "_" + $scope.table.cols[cidx].name]) {
                                    CKEDITOR.instances[$scope.table.scope + "_" + $scope.table.cols[cidx].name].setData( $scope.table.colByIndex($scope.rowsn, $scope.table.cols[cidx].name).value?$scope.table.colByIndex($scope.rowsn, $scope.table.cols[cidx].name).value:"" );
                                }
                        }
                        break;
                    case "add":
                        // none 
                        break;
                    case "delete":
                        $scope.table.deleteRow(theRow);
                        break;
                }                
                // end of code
                $scope.action(); // trigger outside event
            };

            $scope.buttonState = function(name, rowstate) {
                var right = $scope.table.rights?(parseInt($scope.table.rights[name])?true:false):false;
                 return  wliuTableService.buttonState(name, rowstate) && right;
            };
            
        },
        link: function (sc, el, attr) {
        }
    }
});

wliu_table.directive("table.tablebutton", function (wliuTableService) {
    return {
        restrict: "E",
        replace: true,
        scope: {
            table:      "=",
            name:       "@",
            actname:    "@",
            outline:    "@",
            action:     "&",
            before:     "&",
            after:      "&"
        },
        template: [
                    '<span>',
                        '<button class="btn btn{{ outline==1?\'-outline\':\'\'}}-{{ buttonStyle() }} waves-effect" scope="{{ table.scope }}" ',
                            'style="min-width:60px;" ',
                            'title="{{table.colMeta(name).coldesc?table.colMeta(name).coldesc:table.colMeta(name).colname}}"',
                            'ng-click="action1()" ',
                        '>',
                        '{{actname}}',
                        '</button>',
                    '</span>'
                ].join(''),
        controller: function ($scope) {
            
            $scope.buttonStyle = function() {
                var ret_val = "primary";
                switch( $scope.name ) {
                    case "search":
                        ret_val = "secondary";
                        break;
                    case "match":
                        ret_val = "secondary";
                        break;
                    case "save":
                        ret_val = "secondary";
                        break;
                    case "cancel":
                        ret_val = "warning";
                        break;
                    default:
                        ret_val = "info";
                        break;
                }
                return ret_val;
            }
            $scope.action1 = function(theRow) {
                $scope.before();
                // add you code here 
                switch( $scope.name.toLowerCase() ) {
                    case "search":
                        $scope.table.allRows();
                        break;
                    case "match":
                        $scope.table.matchRows();
                        break;
                    case "save":
                        $scope.table.saveRows();
                        break;
                    case "cancel":
                        $scope.table.cancelRows();
                        // ckeditor  reset value to old value;  due to single way sync 
                        for(var cidx in $scope.table.cols) {
                            if( $scope.table.cols[cidx].coltype.toLowerCase() == "ckeditor" )
                                if(CKEDITOR.instances[$scope.table.scope + "_" + $scope.table.cols[cidx].name]) {
                                    CKEDITOR.instances[$scope.table.scope + "_" + $scope.table.cols[cidx].name].setData( $scope.table.colByIndex($scope.rowsn, $scope.table.cols[cidx].name).value?$scope.table.colByIndex($scope.rowsn, $scope.table.cols[cidx].name).value:"" );
                                }
                        }
                        break;
                    default:
                        break;
                }                
                //
                $scope.action();
                $scope.after();
            };

            $scope.buttonState = function() {

            };
        },
        link: function (sc, el, attr) {
        }
    }
});

wliu_table.directive("table.singlebutton", function (wliuTableService) {
    return {
        restrict: "E",
        replace: true,
        scope: {
            table:      "=",
            rowsn:      "@",
            name:       "@",
            actname:    "@",
            action:     "&",
            outline:    "@",
            icon:       "@",
            before:     "&",
            after:      "&"
        },
        template: [
                    '<span>',
                        '<button class="btn btn{{ outline==1?\'-outline\':\'\'}}-{{ buttonStyle() }} waves-effect" scope="{{ table.scope }}" ',
                            'style="min-width:60px;" ',
                            'title="{{table.colMeta(name).coldesc?table.colMeta(name).coldesc:table.colMeta(name).colname}}"',
                            'ng-disabled="!buttonState(name, table.rowByIndex(rowsn).rowstate)" ',
                            'ng-click="action1(table.rowByIndex(rowsn))" ',
                            'title="{{ table.rowByIndex(rowsn).error.errorCode ? table.rowByIndex(rowsn).error.errorMessage : \'\' }}"',
                        '>',
                        '<span style="vertical-align:middle;">',
                            '{{actname}}',
                        '</span>',
                        '</button>',
                    '</span>'
                ].join(''),
        controller: function ($scope) {
            $scope.buttonStyle = function() {
                var ret_val = "primary";
                switch( $scope.name ) {
                    case "save":
                        ret_val = "secondary";
                        break;
                    case "cancel":
                        ret_val = "warning";
                        break;
                }
                return ret_val;
            }
            $scope.action1 = function(theRow) {
                $scope.before();
                // add you code here 
                switch( $scope.name.toLowerCase() ) {
                    case "save":
                        $scope.table.saveRow(theRow);
                        break;
                    case "cancel":
                        if( $scope.table.singleKeys ) 
                            $scope.table.cancelRow(theRow);
                         else 
                            $scope.table.clearRow(theRow);

                        // ckeditor  reset value to old value;  due to single way sync 
                        for(var cidx in $scope.table.cols) {
                            if( $scope.table.cols[cidx].coltype.toLowerCase() == "ckeditor" )
                               if(CKEDITOR.instances[$scope.table.scope + "_" + $scope.table.cols[cidx].name]) {
                                    CKEDITOR.instances[$scope.table.scope + "_" + $scope.table.cols[cidx].name].setData( $scope.table.colByIndex($scope.rowsn, $scope.table.cols[cidx].name).value?$scope.table.colByIndex($scope.rowsn, $scope.table.cols[cidx].name).value:"" );
                                }
                        }
                        break;
                }                
                //
                $scope.action();
                $scope.after();
            };

            $scope.buttonState = function(name, rowsn) {
                var right = $scope.table.rights?(parseInt($scope.table.rights[name])?true:false):false;
                return  rowsn>=0 && right;
            };
        },
        link: function (sc, el, attr) {
        }
    }
});

wliu_table.directive("table.rowbutton", function (wliuTableService) {
    return {
        restrict: "E",
        replace: true,
        scope: {
            table:      "=",
            rowsn:      "@",
            name:       "@",
            actname:    "@",
            action:     "&",
            outline:    "@",
            icon:       "@",
            before:     "&",
            after:      "&"
        },
        template: [
                    '<span>',
                        '<button class="btn btn{{ outline==1?\'-outline\':\'\'}}-{{ buttonStyle() }} waves-effect" scope="{{ table.scope }}" ',
                            'style="min-width:60px;" ',
                            'title="{{table.colMeta(name).coldesc?table.colMeta(name).coldesc:table.colMeta(name).colname}}"',
                            'ng-click="action1(table.rowByIndex(rowsn))" ',
                            'ng-if="buttonState(name, table.rowByIndex(rowsn).rowstate)" ',
                            'title="{{ table.rowByIndex(rowsn).error.errorCode ? table.rowByIndex(rowsn).error.errorMessage : \'\' }}"',
                        '>',
                        '<span ng-if="icon==1" style="vertical-align:middle;">',
                            '<i class="wliu-btn16 wliu-btn16-rowstate-error"    ng-if="table.rowByIndex(rowsn).error.errorCode" ',
                                'title="{{ table.rowByIndex(rowsn).error.errorCode ? table.rowByIndex(rowsn).error.errorMessage : \'\' }}"',
                            '></i> ',
                            '<i class="wliu-btn16 wliu-btn16-rowstate-save"     ng-if="table.rowByIndex(rowsn).error.errorCode==0 && table.rowByIndex(rowsn).rowstate==1" title="Changed"></i> ',
                            '<i class="wliu-btn16 wliu-btn16-rowstate-add"      ng-if="table.rowByIndex(rowsn).error.errorCode==0 && table.rowByIndex(rowsn).rowstate==2" title="New"></i> ',
                            '<i class="wliu-btn16 wliu-btn16-rowstate-delete"   ng-if="table.rowByIndex(rowsn).error.errorCode==0 && table.rowByIndex(rowsn).rowstate==3" tilte="Deleted"></i> ',
                        '</span>',
                        '<span style="vertical-align:middle;">',
                            '{{actname}}',
                        '</span>',
                        '</button>',
                    '</span>'
                ].join(''),
        controller: function ($scope) {
            $scope.buttonStyle = function() {
                var ret_val = "primary";
                switch( $scope.name ) {
                    case "detail":
                        ret_val = "info";
                        break;
                    case "add":
                        ret_val = "default";
                        break;
                    case "save":
                        ret_val = "secondary";
                        break;
                    case "clear":
                    case "cancel":
                        ret_val = "warning";
                        break;
                    case "delete":
                        ret_val = "danger";
                        break;
                }
                return ret_val;
            }
            $scope.action1 = function(theRow) {
                $scope.before();
                // add you code here 
                switch( $scope.name.toLowerCase() ) {
                    case "detail":
                        $scope.table.rownoByRow(theRow);
                        break;
                    case "save":
                        $scope.table.saveRow(theRow);
                        break;
                    case "cancel":
                        $scope.table.cancelRow(theRow);
                        // ckeditor  reset value to old value;  due to single way sync 
                        for(var cidx in $scope.table.cols) {
                            if( $scope.table.cols[cidx].coltype.toLowerCase() == "ckeditor" )
                                if(CKEDITOR.instances[$scope.table.scope + "_" + $scope.table.cols[cidx].name]) {
                                    CKEDITOR.instances[$scope.table.scope + "_" + $scope.table.cols[cidx].name].setData( $scope.table.colByIndex($scope.rowsn, $scope.table.cols[cidx].name).value?$scope.table.colByIndex($scope.rowsn, $scope.table.cols[cidx].name).value:"" );
                                }
                        }
                        break;
                    case "clear":
                        $scope.table.clearRow(theRow);
                        // ckeditor  reset value to old value;  due to single way sync 
                        for(var cidx in $scope.table.cols) {
                            if( $scope.table.cols[cidx].coltype.toLowerCase() == "ckeditor" )
                                if(CKEDITOR.instances[$scope.table.scope + "_" + $scope.table.cols[cidx].name]) {
                                    CKEDITOR.instances[$scope.table.scope + "_" + $scope.table.cols[cidx].name].setData( $scope.table.colByIndex($scope.rowsn, $scope.table.cols[cidx].name).value?$scope.table.colByIndex($scope.rowsn, $scope.table.cols[cidx].name).value:"" );
                                }
                        }
                        break;
                    case "add":
                        $scope.table.addRow(0, $scope.table.newRow());
                        $scope.table.rowno(0);
                        break;
                    case "delete":
                        $scope.table.deleteRow(theRow);
                        break;
                }                
                //
                $scope.action();
                $scope.after();
            };

            $scope.buttonState = function(name, rowstate) {
                var right = $scope.table.rights?(parseInt($scope.table.rights[name])?true:false):false;
                if( name=="add" && rowstate==undefined ) return true;
                return  wliuTableService.buttonState(name, rowstate) && right;
            };
        },
        link: function (sc, el, attr) {
        }
    }
});

wliu_table.directive("table.bicon", function (wliuTableService) {
    return {
        restrict: "E",
        replace: true,
        scope: {
            table:      "=",
            rowsn:      "@",
            xsize:      "@",
            name:       "@",
            actname:    "@",
            action:     "&"
        },
        template: [
                    '<span>',
                    '<a class="wliu-btn{{xsize}} wliu-btn{{xsize}}-{{name}}" scope="{{ table.scope }}" ',
                        'title="{{actname?actname:name}}"',
                        'ng-click="action1(table.rowByIndex(rowsn))" ',
                        'ng-if="buttonState(name, table.rowByIndex(rowsn).rowstate)"',
                    '>',
                    '</a>',
                    '</span>'
                ].join(''),
        controller: function ($scope) {
            $scope.xsize = $scope.xsize?$scope.xsize:16;

            $scope.action1 = function(theRow) {
                // add you code here 
                 switch( $scope.name.toLowerCase() ) {
                    case "detail":
                        $scope.table.rownoByRow(theRow);
                        break;
                    case "save":
                        $scope.table.saveRow(theRow);
                        break;
                    case "cancel":
                        $scope.table.cancelRow(theRow);

                        // ckeditor  reset value to old value;  due to single way sync 
                        for(var cidx in $scope.table.cols) {
                            if( $scope.table.cols[cidx].coltype.toLowerCase() == "ckeditor" )
                                if(CKEDITOR.instances[$scope.table.scope + "_" + $scope.table.cols[cidx].name]) {
                                    CKEDITOR.instances[$scope.table.scope + "_" + $scope.table.cols[cidx].name].setData( $scope.table.colByIndex($scope.rowsn, $scope.table.cols[cidx].name).value?$scope.table.colByIndex($scope.rowsn, $scope.table.cols[cidx].name).value:"" );
                                }
                        }
                        break;
                    case "add":
                        // none 
                        break;
                    case "delete":
                        $scope.table.deleteRow(theRow);
                        break;
                }                
               //
                $scope.action();
            };

            $scope.buttonState = function(name, rowstate) {
                var right = $scope.table.rights?(parseInt($scope.table.rights[name])?true:false):false;
                return  wliuTableService.buttonState(name, rowstate) && right;
            };
       },
        link: function (sc, el, attr) {
        }
    }
});

wliu_table.directive("table.btext", function (wliuTableService) {
    return {
        restrict: "E",
        replace: true,
        scope: {
            table:      "=",
            rowsn:      "@",
            name:       "@",
            actname:    "@",
            action:     "&"
        },
        template: [
                    '<span>',
                    '<a href="javascript:void(0)" class="wliu-table-button" scope="{{ table.scope }}" ',
                        'title="{{actname?actname:name}}" ',
                        'ng-click="action1(table.rowByIndex(rowsn))" ',
                        'ng-if="buttonState(name, table.rowByIndex(rowsn).rowstate)" ',    
                    '>',
                    '{{actname?actname:name.capital()}}',
                    '</a>',
                    '</span>'
                ].join(''),
        controller: function ($scope) {
            $scope.action1 = function(theRow) {
                // add you code here 
                 switch( $scope.name.toLowerCase() ) {
                    case "detail":
                        $scope.table.rownoByRow(theRow);
                        break;
                    case "save":
                        $scope.table.saveRow(theRow);
                        break;
                    case "cancel":
                        $scope.table.cancelRow(theRow);

                        // ckeditor  reset value to old value;  due to single way sync 
                        for(var cidx in $scope.table.cols) {
                            if( $scope.table.cols[cidx].coltype.toLowerCase() == "ckeditor" )
                                if(CKEDITOR.instances[$scope.table.scope + "_" + $scope.table.cols[cidx].name]) {
                                    CKEDITOR.instances[$scope.table.scope + "_" + $scope.table.cols[cidx].name].setData( $scope.table.colByIndex($scope.rowsn, $scope.table.cols[cidx].name).value?$scope.table.colByIndex($scope.rowsn, $scope.table.cols[cidx].name).value:"" );
                                }
                        }
                        break;
                    case "add":
                        // none 
                        break;
                    case "delete":
                        $scope.table.deleteRow(theRow);
                        break;
                }                
               //
                $scope.action();
            };

            $scope.buttonState = function(name, rowstate) {
                var right = $scope.table.rights?(parseInt($scope.table.rights[name])?true:false):false;
                return  wliuTableService.buttonState(name, rowstate) && right;
            };
       },
        link: function (sc, el, attr) {
        }
    }
});

wliu_table.directive("table.hgroup", function () {
    return {
        restrict:   "E",
        replace:    true,
        transclude: true,           
        scope: {
            table:      "=",
            actname:    "@"
        },
        template: [
                    '<div class="dropdown" style="white-space:nowrap;">',
                        '<button scope="{{ table.scope }} class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" ',
                             'style="font-size:0.8em;" ',
                             'ng-class="{\'btn-info\':  rowstate()==0, \'btn-warning\':  rowstate()!=0}"',
                         '>',
                            '{{actname}} ',
                            '<i class="fa fa-1 fa-caret-down"></i>',
                        '</button>',
                        '<ul class="dropdown-menu" style="white-space:nowrap;" ng-transclude>',
                        '</ul>',
                    '</div>'
                ].join(''),
        controller: function ($scope) {
            $scope.rowstate = function() {
                var _state = 0;
                for(var ridx in $scope.table.rows) {
                    _state = Math.max( _state, $scope.table.rows[ridx].rowstate );
                }
                return _state;
            }
        },
        link: function (sc, el, attr) {
        }
    }
});

wliu_table.directive("table.hlink", function (wliuTableService) {
    return {
        restrict: "E",
        replace: true,
        scope: {
            table:      "=",
            name:       "@",
            actname:    "@",
            action:     "&"
        },
        template: [
                    '<span><a href="javascript:void(0);" class="wliuCommon-table-btn16" scope="{{ table.scope }}" ',
                        'title="{{table.colMeta(name).coldesc?table.colMeta(name).coldesc:table.colMeta(name).colname}}"',
                        'ng-click="action1()" ',
                        'ng-if="buttonState(name, rowstate())"',
                    '>',
                    '<i class="wliu-btn16 wliu-btn16-{{name}}"></i> ',
                    '<span style="vertical-align:middle;">{{actname}}</span>',
                    '</a></span>'
                ].join(''),
        controller: function ($scope) {
            $scope.action1 = function() {
                // add you code here 
                switch( $scope.name.toLowerCase() ) {
                    case "save":
                        $scope.table.saveRows();
                        break;
                    case "cancel":
                        $scope.table.cancelRows();
                        break;
                    case "add":
                        $scope.table.addRow(0, $scope.table.newRow());
                        break;
                    case "delete":
                        // No
                        break;
                }                
                //
                $scope.action();
            };

            $scope.rowstate = function() {
                var _state = 0;
                for(var ridx in $scope.table.rows) {
                    _state = Math.max( _state, $scope.table.rows[ridx].rowstate );
                }
                return _state;
            };

            $scope.buttonState = function(name, rowstate) {
                var right = $scope.table.rights?(parseInt($scope.table.rights[name])?true:false):false;
                return  wliuTableService.buttonState(name, rowstate) && right;
            };
            
        },
        link: function (sc, el, attr) {
        }
    }
});

wliu_table.directive("table.hicon", function (wliuTableService) {
    return {
        restrict: "E",
        replace: true,
        scope: {
            table:      "=",
            xsize:      "@",
            name:       "@",
            actname:    "@",
            action:     "&"
        },
        template: [
                    '<span>',
                    '<a class="wliu-btn{{xsize}} wliu-btn{{xsize}}-{{name}}" scope="{{ table.scope }}" ',
                        'title="{{actname?actname:name}}"',
                        'ng-click="action1()" ',
                        'ng-if="buttonState(name, rowstate())"',
                    '>',
                    '</a>',
                    '</span>'
                ].join(''),
        controller: function ($scope) {
            $scope.xsize = $scope.xsize?$scope.xsize:16;

            $scope.action1 = function() {
                // add you code here 
                switch( $scope.name.toLowerCase() ) {
                    case "save":
                        $scope.table.saveRows();
                        break;
                    case "cancel":
                        $scope.table.cancelRows();
                        break;
                    case "add":
                        $scope.table.addRow();
                        break;
                    case "delete":
                        // No
                        break;
                }                
                //
                $scope.action();
            };

            $scope.rowstate = function() {
                var _state = 0;
                for(var ridx in $scope.table.rows) {
                    _state = Math.max( _state, $scope.table.rows[ridx].rowstate );
                }
                return _state;
            };

            $scope.buttonState = function(name, rowstate) {
                var right = $scope.table.rights?(parseInt($scope.table.rights[name])?true:false):false;
                return  wliuTableService.buttonState(name, rowstate) && right;
            };
       },
        link: function (sc, el, attr) {
        }
    }
});

wliu_table.directive("table.htext", function (wliuTableService) {
    return {
        restrict: "E",
        replace: true,
        scope: {
            table:      "=",
            name:       "@",
            actname:    "@",
            action:     "&"
        },
        template: [
                    '<span>',
                    '<a href="javascript:void(0)" class="wliu-table-hbutton" scope="{{ table.scope }}" ',
                            'title="{{ actname?actname:name }}" ',
                            'ng-click="action1()"',
                            'ng-if="buttonState(name, rowstate())"',                     
                    '>',
                    '{{ actname?actname:name.capital() }}',
                    '</a>',
                    '</span>'
                ].join(''),
        controller: function ($scope) {
            $scope.action1 = function() {
                // add you code here 
                switch( $scope.name.toLowerCase() ) {
                    case "save":
                        $scope.table.saveRows();
                        break;
                    case "cancel":
                        $scope.table.cancelRows();
                        break;
                    case "add":
                        $scope.table.addRow();
                        break;
                    case "delete":
                        // No
                        break;
                }                
                //
                $scope.action();
            };

            $scope.rowstate = function() {
                var _state = 0;
                for(var ridx in $scope.table.rows) {
                    _state = Math.max( _state, $scope.table.rows[ridx].rowstate );
                }
                return _state;
            };

            $scope.buttonState = function(name, rowstate) {
                var right = $scope.table.rights?(parseInt($scope.table.rights[name])?true:false):false;
                return  wliuTableService.buttonState(name, rowstate) && right;
            };
       },
        link: function (sc, el, attr) {
        }
    }
});

wliu_table.directive("table.rowerror", function (wliuTableService) {
    return {
        restrict: "E",
        replace: true,
        scope: {
            table:      "=",
            targetid:   "@",
            rowsn:      "@"
        },
        template: [
                    '<div id="{{targetid}}" class="wliu-diag">',
                        '<div class="wliu-diag-content" style="font-size:16px;">',
                        '<i class="fa fa-exclamation-triangle fa-lg" aria-hidden="true" style="color:red;"></i> <span style="font-size:16px;">We can\'t process submitted data:</span>',
                        '<div style="margin-top:12px;" ng-bind-html="getHTML()"></div>',
                        '</div>',    
                    '</div>'
                ].join(''),
        controller: function ($scope, $sce) {
            $scope.getHTML = function() {
                if( $scope.table.rowByIndex($scope.rowsn) )
                    if( $scope.table.rowByIndex($scope.rowsn).error.errorCode )
                        return $sce.trustAsHtml($scope.table.rowByIndex($scope.rowsn).error.errorMessage.nl2br());
                    else 
                        return $sce.trustAsHtml("");
            }
        },
        link: function (sc, el, attr) {
            $(function(){
                $(el).wliuDiag({ fade:false, movable: true, title: "Message"});
                $(el).unbind("errorshow").bind("errorshow", function(evt){
                    if( sc.table.rowByIndex(sc.rowsn) ) {
                        if( parseInt(sc.table.rowByIndex(sc.rowsn).error.errorCode) ) {
                            $(el).trigger("show");
                        }
                    }
                });
            });
        }
    }
});

wliu_table.directive("table.taberror", function (wliuTableService) {
    return {
        restrict: "E",
        replace: true,
        scope: {
            table:      "=",
            targetid:   "@"
        },
        template: [
                    '<div id="{{targetid}}" class="wliu-diag">',
                        '<div class="wliu-diag-content" style="font-size:16px;">',
                        '<i class="fa fa-exclamation-triangle fa-lg" aria-hidden="true" style="color:red;"></i> <span style="font-size:16px;">We can\'t process submitted data:</span>',
                        '<div style="margin-top:12px;" ng-bind-html="getHTML()"></div>',
                        '</div>',    
                    '</div>'
                ].join(''),
        controller: function ($scope, $sce) {
            $scope.getHTML = function() {
                if( $scope.table.error.errorCode )
                    return $sce.trustAsHtml($scope.table.error.errorMessage.nl2br());
                else 
                    return $sce.trustAsHtml("");
            }
        },
        link: function (sc, el, attr) {
            $(function(){
                $(el).wliuDiag({ fade:false, movable: true, title: "Message"});
                $(el).unbind("errorshow").bind("errorshow", function(evt){
                    if( parseInt(sc.table.error.errorCode) ) {
                        $(el).trigger("show");
                    }
                });
            });
        }
    }
});

wliu_table.directive("table.tooltip", function (wliuTableService) {
    return {
        restrict: "E",
        replace: true,
        scope: {
            table:      "=",
            targetid:   "@"
        },
        template: [
                    '<div id="{{targetid}}"></div>'
                ].join(''),
        controller: function ($scope, $sce) {
        },
        link: function (sc, el, attr) {
            $(function(){
                $(el).wliuPopup();
            });
        }
    }
});

wliu_table.directive("table.wait", function (wliuTableService) {
    return {
        restrict: "E",
        replace: true,
        scope: {
            table:      "=",
            targetid:   "@",
            maskable:   "@"
        },
        template: [
                    '<div id="{{targetid}}"></div>'
                ].join(''),
        controller: function ($scope, $sce) {
        },
        link: function (sc, el, attr) {
            $(function(){
                $(el).wliuLoad({maskable:parseInt(sc.maskable)});
            });
        }
    }
});

wliu_table.directive("table.tips", function (wliuTableService) {
    return {
        restrict: "E",
        replace: true,
        scope: {
            table:      "=",
            targetid:   "@",
            halign:     "@",
            valign:     "@",
            type:       "@"
        },
        template: [
                    '<div id="{{targetid}}"></div>'
                ].join(''),
        controller: function ($scope, $sce) {
        },
        link: function (sc, el, attr) {
            $(function(){
   				$(el).wliuTips({hAlign:sc.halign, vAlign:sc.valign, type:sc.type});

            });
        }
    }
});

/****** Form Service *********/
wliu_table.service("wliuTableService", function () {
    var self = this;
    // state control button status
    self.btnActive = {
        "0": { "detail": 1, "save": 0, "cancel": 0, "clear":0, "add": 1, "delete": 1, "output": 1, "print": 1, "email": 1 },
        "1": { "detail": 1, "save": 1, "cancel": 1, "clear":1, "add": 0, "delete": 0, "output": 0, "print": 0, "email": 0 },
        "2": { "detail": 1, "save": 1, "cancel": 1, "clear":1, "add": 0, "delete": 0, "output": 0, "print": 0, "email": 0 },
        "3": { "detail": 1, "save": 1, "cancel": 1, "clear":0, "add": 0, "delete": 0, "output": 0, "print": 0, "email": 0 }
    };

    self.buttonState = function(name, rowstate ) {
        return self.btnActive[rowstate]?(self.btnActive[rowstate][name]?true:false):false;
    }
});