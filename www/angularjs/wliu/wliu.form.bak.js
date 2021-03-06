var wliu_form = angular.module("wliuForm",[]);

wliu_form.directive("form.rowstatus", function () {
    return {
        restrict: "E",
        replace: true,
        scope: {
            form:      "=",
            rowsn:      "@",
            tooltip:    "@"
        },
        template: [
                    '<span class="wliu-text" scope="{{ form.scope }}" style="vertical-align:middle;padding:0px;" ',
                        'ng-disabled="form.getRow(rowsn)==undefined" ',
                        'title="{{ tooltip?\'\':(form.getRow(rowsn).error.errorCode ? form.getRow(rowsn).error.errorMessage : \'\') }}"',
                    '>',
                        /*
                        '<a class="wliu-btn16 wliu-btn16-rowstate-error"    ng-if="form.getRow(rowsn).error.errorCode" ',
                            'title="{{ tooltip?\'\':(form.getRow(rowsn).error.errorCode? form.getRow(rowsn).error.errorMessage : \'\') }}"',
                        '>',
                        */
                        '<span style="color:red;" ng-if="form.getRow(rowsn).error.errorCode">填写有错误，请检查表格或鼠标点击问号查看错误 : </span>',
                        '<a class="wliu-btn24 wliu-btn24-error-help"    ng-if="form.getRow(rowsn).error.errorCode" ',
                            'popup-target="{{tooltip?tooltip:\'\'}}" popup-toggle="hover" ',
                            'popup-body="{{form.getRow(rowsn).error.errorCode?form.getRow(rowsn).error.errorMessage.nl2br():\'\'}}"',
                            'title="{{ tooltip?\'\':(form.getRow(rowsn).error.errorCode? form.getRow(rowsn).error.errorMessage : \'\') }}"',
                        '>',
                        '</a>',
                        '<a class="wliu-btn16 wliu-btn16-rowstate-save"     ng-if="form.getRow(rowsn).error.errorCode==0 && form.getRow(rowsn).rowstate==1" style="padding-left:20px;vertical-align:middle;font-size:14px;" title="Changed"></a>',
                        '<a class="wliu-btn16 wliu-btn16-rowstate-add"      ng-if="form.getRow(rowsn).error.errorCode==0 && form.getRow(rowsn).rowstate==2" style="padding-left:20px;vertical-align:middle;font-size:14px;" title="New"></a>',
                        '<a class="wliu-btn16 wliu-btn16-rowstate-delete"   ng-if="form.getRow(rowsn).error.errorCode==0 && form.getRow(rowsn).rowstate==3" style="padding-left:20px;vertical-align:middle;font-size:14px;" title="Deleted"></a>',
                        '<span style="color:#666666;" ng-if="!form.getRow(rowsn).error.errorCode">带红色星号<span style="color:red;font-size:1.5em;"> * </span>的内容是必填的</span>',
                        //'<div style="margin-top:12px;" ng-bind-html="getHTML()"></div>',
                    '</span>'
                ].join(''),
        controller: function ($scope, $sce) {
            $scope.getHTML = function() {
                if( $scope.form.getRow($scope.rowsn) )
                    if( $scope.form.getRow($scope.rowsn).error.errorCode )
                        return $sce.trustAsHtml($scope.form.getRow($scope.rowsn).error.errorMessage.nl2br());
                    else 
                        return $sce.trustAsHtml("");
            }
        },
        link: function (sc, el, attr) {
        }
    }
});

wliu_form.directive("form.ckeditor", function () {
    return {
        restrict: "E",
        replace: true,
        scope: {
            form:      "=",
            rowsn:      "@",
            name:       "@",
            hh:         "@"
        },
        template: [
                    '<span ng-hide="form.relationHide(rowsn, name)">',
                        '<a class="wliu-btn16 wliu-btn16-rowstate-error" ng-if="form.getCol(name, rowsn).errorCode"></a>',
                        '<span style="color:red; vertical-align:middle;" ng-if="form.getCol(name, rowsn).errorCode">Error: {{form.getCol(name, rowsn).errorCode?form.getCol(name, rowsn).errorMessage:""}}</span>',
                        '<textarea scope="{{ form.scope }}" ng-model="form.getCol(name, rowsn).value" id="{{form.scope}}_{{name}}" ',
                                  'title="{{ form.getRow(rowsn).error.errorCode ? form.getRow(rowsn).error.errorMessage : \'\' }}"',
                        '>',
                        '</textarea>',
                    '</span>'
                ].join(''),
        controller: function ($scope) {
            //  model change ,  it will not sync to ckeditor
            //  only sync to ckeditor when initialize the model.
            $scope.modelChange = function() {
                if( $scope.form.getCol($scope.name, $scope.rowsn) )  {
                    if(CKEDITOR.instances[$scope.form.scope+"_"+$scope.name])
                        if( $scope.form.getCol( $scope.name, $scope.rowsn ).value != CKEDITOR.instances[$scope.form.scope+"_"+$scope.name].getData() )
                            CKEDITOR.instances[$scope.form.scope+"_"+$scope.name].setData( $scope.form.getCol($scope.name, $scope.rowsn).value );
                }  else {
                    if(CKEDITOR.instances[$scope.form.scope+"_"+$scope.name])
                        CKEDITOR.instances[$scope.form.scope+"_"+$scope.name].setData("");
                }
            }
            $scope.$watch("form.getCol(name, rowsn).value", $scope.modelChange);
        },
        link: function (sc, el, attr) {
            $(function(){
                htmlObj_cn = CKEDITOR.replace(sc.form.scope + "_" + sc.name,{height:sc.hh});
                // The "change" event is fired whenever a change is made in the editor.
                htmlObj_cn.on('change', function (evt) {
                    if( sc.form.getCol( sc.name, sc.rowsn ) ) {
                        if( sc.form.getCol( sc.name, sc.rowsn ).value != CKEDITOR.instances[sc.form.scope+"_"+sc.name].getData() ) {
                            sc.form.getCol( sc.name, sc.rowsn ).value = CKEDITOR.instances[sc.form.scope+"_"+sc.name].getData();
                            sc.form.changeCol(sc.name, sc.rowsn);
                            // to prevent diggest in progress in angular.
                            if( !sc.$root.$$phase) sc.$apply();
                        }
                    }
                });
            });
        }
    }
});

wliu_form.directive("form.ckinline", function () {
    return {
        restrict: "E",
        replace: true,
        scope: {
            form:      "=",
            rowsn:      "@",
            name:       "@",
            hh:         "@",
            minhh:      "@"
        },
        template: [
                    '<span>',
                        '<a class="wliu-btn16 wliu-btn16-rowstate-error" ng-if="form.getCol(name, rowsn).errorCode"></a>',
                        '<span style="color:red; vertical-align:middle;" ng-if="form.getCol(name, rowsn).errorCode">Error: {{form.getCol(name, rowsn).errorCode?form.getCol(name, rowsn).errorMessage:""}}</span>',
                        '<input type="hidden" ng-model="form.getCol(name, rowsn).value" />',
                        '<div scope="{{ form.scope }}" id="{{form.scope}}_{{name}}" contentEditable=true style="display:block;overflow:auto;min-height:{{minhh}}px;height:{{hh}}px;border:1px solid #cccccc;">',
                        '{{form.getCol(name, rowsn).value}}',
                        '</div>',
                    '</span>'
                ].join(''),
        controller: function ($scope) {
            $scope.minhh = $scope.minhh?$scope.minhh:"80";

            //  model change ,  it will not sync to ckeditor
            //  only sync to ckeditor when initialize the model.
            $scope.modelChange = function() {
                if( $scope.form.getCol($scope.name, $scope.rowsn) )  {
                    if(CKEDITOR.instances[$scope.form.scope+"_"+$scope.name])
                        if( $scope.form.getCol( $scope.name, $scope.rowsn ).value != CKEDITOR.instances[$scope.form.scope+"_"+$scope.name].getData() )
                            CKEDITOR.instances[$scope.form.scope+"_"+$scope.name].setData( $scope.form.getCol($scope.name, $scope.rowsn).value );
                }  else {
                    if(CKEDITOR.instances[$scope.form.scope+"_"+$scope.name])
                        CKEDITOR.instances[$scope.form.scope+"_"+$scope.name].setData("");
                }
            }
            $scope.$watch("form.getCol(name, rowsn).value", $scope.modelChange);
        },
        link: function (sc, el, attr) {
            $(function(){
                CKEDITOR.disableAutoInline = true;
                htmlObj_cn = CKEDITOR.inline(sc.form.scope + "_" + sc.name);
                // The "change" event is fired whenever a change is made in the editor.
                htmlObj_cn.on('change', function (evt) {
                    if( sc.form.getCol( sc.name, sc.rowsn ) ) {
                        if( sc.form.getCol( sc.name, sc.rowsn ).value != CKEDITOR.instances[sc.form.scope+"_"+sc.name].getData() ) {
                            sc.form.getCol( sc.name, sc.rowsn ).value = CKEDITOR.instances[sc.form.scope+"_"+sc.name].getData();
                            sc.form.changeCol(sc.name, sc.rowsn);
                            // to prevent diggest in progress in angular.
                            if( !sc.$root.$$phase) sc.$apply();
                        }
                    }
                });
            });
        }
    }
});


wliu_form.directive("form.fileupload", function () {
    return {
        restrict: "E",
        replace: true,
        scope: {
            form:           "=",
            file:           "=",
            rowsn:          "@",
            name:           "@",
            icon:           "@",
            actname:        "@",
            filename:       "@",
            tooltip:        "@"
        },
        template: [
                    '<div style="display:inline-block;">',
                        '<i ng-if="icon" class="wliu-btn24 wliu-btn24-file-upload" style="overflow:hidden;" ',
                            'title="{{tooltip?\'\':\'upload File\'}}" ',
                            'popup-target="{{tooltip?\'#\'+tooltip:\'\'}}" popup-toggle="hover" popup-body="Upload File" ',
                        '>',
                                '<input type="file" style="display:block; position:absolute; opacity:0;top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" value="Browse..." ',
                                        'onchange="angular.element(this).scope().selectFile(event);" ',
                                        'ng-disabled="form.getCol(name, rowsn)==undefined" />',
                        '</i>',
                        '<div ng-if="!icon" class="btn btn-info" style="display:inline-block;position:relative;text-transform:none;overflow:hidden;height:20px;line-height:20px;padding:2px 8px;">',
                            '<a class="wliu-btn16 wliu-btn16-upload"></a>',
                            '<input type="file" onchange="angular.element(this).scope().selectFile(event);" style="display:block; position:absolute; opacity:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" value="Browse..." />',
                            ' {{actname}}',
                        '</div>',
                        '<div style="display:inline-block;position:relative;margin-left:5px;font-size:12px;font-weight:bold;color:red;" ng-if="form.getCol(name, rowsn).errorCode">{{form.getCol(name, rowsn).errorMessage}}</div>',
                        '<div style="display:inline-block;margin-left:5px;" ng-if="form.getCol(name, rowsn).value && !form.getCol(name, rowsn).errorCode">',
                            '<a class="wliu-btn16 wliu-btn16-dispose" ng-click="deleteFile()" ',
                                'title="{{tooltip?\'\':\'Delete File\'}}" ',
                                'popup-target="{{tooltip?\'#\'+tooltip:\'\'}}" popup-toggle="hover" popup-body="Delete File" ',
                            '>',
                            '<a href="javascript:void(0)" style="vertical-align:middle;margin-left:2px;font-size:12px;text-decoration:underline;" ng-click="downloadFile()">{{theFile.full_name.subName(12)?theFile.full_name.subName(12):filename}}</a>',
                        '</div>',
                    '</div>'
                ].join(''),
        controller: function ($scope) {
            $scope.theFile = new WLIU.FILE();
            $scope.selectFile = function(event) {
                files = (event.srcElement || event.target).files;
                FFILE.fromFile($scope.theFile, files[0], function(fObj){
                    if(fObj.errorCode) {
                        alert(fObj.errorMessage);
                    } else {
                        $scope.form.getCol($scope.name, $scope.rowsn).value = fObj.data?fObj.data:"";
                        $scope.form.changeCol($scope.name, $scope.rowsn);
                        $scope.$apply();  // important: it is async to read image in callback
                    }
                });
            }
            $scope.deleteFile = function() {
                 $scope.form.getCol($scope.name, $scope.rowsn).value = "";
                 $scope.form.changeCol($scope.name, $scope.rowsn);
            }
            $scope.downloadFile = function() {
                if(  $scope.form.getCol($scope.name, $scope.rowsn).value ) {
                    FFILE.exportDataURL($scope.form.getCol($scope.name, $scope.rowsn).value);
                }
            }
        },
        link: function (sc, el, attr) {
        }
    }
});


wliu_form.directive("form.imgupload", function () {
    return {
        restrict: "E",
        replace: true,
        scope: {
            form:           "=",
            rowsn:          "@",
            name:           "@",
            actname:        "@",

            tooltip:        "@",
            ww:             "@",
            hh:             "@",  
            minww:          "@",
            minhh:          "@"
        },
        template: [
                    '<span>',
                        '<div style="position:relative;font-size:16px;font-weight:bold;color:red;" ng-if="form.getCol(name, rowsn).errorCode">{{form.getCol(name, rowsn).errorMessage}}</div>',
                        '<div style="display:inline-block;position:relative;min-width:{{minww}}px;min-height:{{minhh}}px;" class="wliu-background-1" >',
                            '<i class="wliu-btn24 wliu-btn24-image" style="position:absolute; margin-top:3px;margin-left:3px;opacity:0.8; overflow:hidden;" ',
                                'title="{{tooltip?\'\':\'upload Image\'}}" ',
                                'popup-target="{{tooltip?\'#\'+tooltip:\'\'}}" popup-toggle="hover" popup-body="Upload Image" ',
                            '>',
                                    '<input type="file" style="display:block; position:absolute; opacity:0;top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" value="Browse..." ',
                                            'onchange="angular.element(this).scope().selectFile(event);" ',
                                            'ng-disabled="form.getCol(name, rowsn)==undefined" />',
                            '</i>',
                            '<a class="wliu-btn24 wliu-btn24-img-print" ng-click="printImage()" ng-if="form.getCol(name, rowsn).value" style="position:absolute; margin-top:3px;margin-left:30px;opacity:0.8;" ',
                                'title="{{tooltip?\'\':\'Print Image\'}}" ',
                                'popup-target="{{tooltip?\'#\'+tooltip:\'\'}}" popup-toggle="hover" popup-body="Print Image" ',
                            '>',
                            '</a>',
                            '<a class="wliu-btn24 wliu-btn24-dispose" ng-click="deleteImage()" ng-if="form.getCol(name, rowsn).value" style="position:absolute; right:0px; margin-top:3px;margin-right:3px;opacity:0.8;" ',
                                'title="{{tooltip?\'\':\'Delete Image\'}}" ',
                                'popup-target="{{tooltip?\'#\'+tooltip:\'\'}}" popup-toggle="hover" popup-body="Delete Image" ',
                            '>',
                            '</a>',
                            '<span style="position:absolute;top:32px;left:3px;font-size:16px;font-weight:bold;color:#666666;" ng-if="!form.getCol(name, rowsn).value && !form.getCol(name, rowsn).errorCode">{{actname}}</span>',
                            '<div style="display:table;">',
                            '<div style="display:table-cell;vertical-align:middle;text-align:center;width:{{ww}}px;height:{{hh}}px;border:1px solid #cccccc;">',
                                '<img class="img-responsive" width="100%" ng-click="clickImage()" style="display:inline;" src="{{form.getCol(name, rowsn).value?form.getCol(name, rowsn).value:\'\'}}" />',
                            '</div>',
                            '<div>',
                            '<input type="hidden" scope="{{ form.scope }}" title="" ',
                                'ng-model="form.getCol(name, rowsn).value" ',
                                'ng-change="form.changeCol(name, rowsn)" ',
                                'ng-disabled="form.getCol(name, rowsn)==undefined" ',
                            '/>',
                        '</div>',
                    '</span>'
                ].join(''),
        controller: function ($scope) {
            $scope.imgobj       = new WLIU.IMAGE();
            $scope.minww        = $scope.minww?$scope.minww:"120";
            $scope.minhh        = $scope.minhh?$scope.minhh:"80";

            $scope.printImage = function() {
                if(  $scope.form.getCol($scope.name, $scope.rowsn).value ) {
                    FFILE.exportDataURL($scope.form.getCol($scope.name, $scope.rowsn).value);
                }
            }

            $scope.clickImage = function() {
            }
            
            $scope.deleteImage = function() {
                 $scope.form.getCol($scope.name, $scope.rowsn).value = "";
                 $scope.form.changeCol($scope.name, $scope.rowsn);
            }

            $scope.selectFile = function(event) {
                files = (event.srcElement || event.target).files;
                var view = $scope.form.colMeta($scope.name).view?$scope.form.colMeta($scope.name).view:"medium";
                FIMAGE.view = view;
                FIMAGE.fromFile($scope.imgobj, files[0], function(fObj){
                    if(fObj.errorCode) {
                        alert(fObj.errorMessage);
                    } else {
                        $scope.form.getCol($scope.name, $scope.rowsn).value = $scope.imgobj.resize[view].data?$scope.imgobj.resize[view].data:"";
                        $scope.form.changeCol($scope.name, $scope.rowsn);
                        $scope.$apply();  // important: it is async to read image in callback
                    }
                });
            }
        },
        link: function (sc, el, attr) {
            $("img", el).unbind("load").bind("load", function(evt){
                var img = evt.target;
                var i_ww = img.naturalWidth;
                var i_hh = img.naturalHeight;
                var img_rate = i_hh / i_ww;
                
                if( !sc.ww && !sc.hh ) {
                    $(img).css("width", "100%");
                } else { 
                    $(img).css("width","");
                    if( sc.ww && sc.hh ) {
                        var rate_ww = 1;
                        var rate_hh = 1;
                        rate_ww = sc.ww / img.naturalWidth;
                        rate_hh = sc.hh / img.naturalHeight;
                        var rate = Math.min(rate_ww, rate_hh);
                        if(rate < 1) {
                            if(rate_ww < rate_hh) {
                                i_ww 	= sc.ww;
                                i_hh 	= sc.ww * img_rate;
                            } else { 
                                i_hh 	= sc.hh;
                                i_ww	= sc.hh / img_rate;
                            }
                        }
                    } else if(sc.ww) {
                        i_ww        = sc.ww;
                        i_hh        = sc.ww * img_rate;
                    } else if(sc.hh) {
                        i_hh        = sc.hh;
                        i_ww        = sc.hh / img_rate;
                        img.width   = i_ww;
                        img.height  = i_hh;
                    }
                } // if

                img.width   = i_ww;
                img.height  = i_hh;  
            });
            
        }
    }
});

wliu_form.directive("form.imgupload1", function () {
    return {
        restrict: "E",
        replace: true,
        scope: {
            form:           "=",
            rowsn:          "@",
            name:           "@",
            actname:        "@",

            tooltip:        "@",
            ww:             "@",
            hh:             "@",
            view:           "@",
            minww:          "@",
            minhh:          "@"
        },
        template: [
                    '<span>',
                        '<div style="position:relative;font-size:16px;font-weight:bold;color:red;" ng-if="form.getCol(name, rowsn).errorCode">{{form.getCol(name, rowsn).errorMessage}}</div>',
                        '<div style="display:inline-block;position:relative;min-width:{{minww}}px;min-height:{{minhh}}px;"  class="wliu-background-1">',
                            '<i class="wliu-btn24 wliu-btn24-image" style="position:absolute; margin-top:3px;margin-left:3px;opacity:0.8; overflow:hidden;" ',
                                'title="{{tooltip?\'\':\'upload Image\'}}" ',
                                'popup-target="{{tooltip?\'#\'+tooltip:\'\'}}" popup-toggle="hover" popup-body="Upload Image" ',
                            '>',
                                    '<input type="file" style="display:block; position:absolute; opacity:0;top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" value="Browse..." ',
                                            'onchange="angular.element(this).scope().selectFile(event);" ',
                                            'ng-disabled="form.getCol(name, rowsn)==undefined" />',
                            '</i>',
                            '<a class="wliu-btn24 wliu-btn24-img-print" ng-click="printImage()" ng-if="form.getCol(name, rowsn).value" style="position:absolute; margin-top:3px;margin-left:30px;opacity:0.8;" ',
                                'title="{{tooltip?\'\':\'Print Image\'}}" ',
                                'popup-target="{{tooltip?\'#\'+tooltip:\'\'}}" popup-toggle="hover" popup-body="Print Image" ',
                            '>',
                            '</a>',
                            '<a class="wliu-btn24 wliu-btn24-dispose" ng-click="deleteImage()" ng-if="form.getCol(name, rowsn).value" style="position:absolute; right:0px; margin-top:3px;margin-right:3px;opacity:0.8;" ',
                                'title="{{tooltip?\'\':\'Delete Image\'}}" ',
                                'popup-target="{{tooltip?\'#\'+tooltip:\'\'}}" popup-toggle="hover" popup-body="Delete Image" ',
                            '>',
                            '</a>',
                            '<span style="position:absolute;top:32px;left:3px;font-size:16px;font-weight:bold;color:#666666;" ng-if="!form.getCol(name, rowsn).value && !form.getCol(name, rowsn).errorCode">{{actname}}</span>',
                            '<div style="display:table;">',
                                '<div style="display:table-cell;vertical-align:middle;text-align:center;width:{{ww}}px;height:{{hh}}px;border:1px solid #cccccc;" class="img-content" targeid="{{form.scope}}_{{name}}_{{imgobj.rowsn}}">',
                                    '<img class="img-responsive" width="100%" ng-click="clickImage()" style="display:inline;cursor:pointer;" src="{{form.getCol(name, rowsn).value?form.getCol(name, rowsn).value:\'\'}}" />',
                                '</div>',
                            '</div>',
                            '<input type="hidden" scope="{{ form.scope }}" title="" ',
                                'ng-model="form.getCol(name, rowsn).value" ',
                                'ng-change="form.changeCol(name, rowsn)" ',
                                'ng-disabled="form.getCol(name, rowsn)==undefined" ',
                            '/>',
                        '</div>',
                
                        '<div id="{{form.scope}}_{{name}}_{{imgobj.rowsn}}" wliu-diag movable maskable fade disposable>',
                            '<div wliu-diag-head>Image Editor</div>',
                            '<div wliu-diag-body>',
                                
                                '<div ng-if="imgobj.errorCode">',
                                    '{{imgobj.errorMessage}}',
                                '</div>',
                                '<div ng-if="!imgobj.errorCode">',
                                    '<div style="min-height:300px;">',
                                        '<div class="wliu-image-frame" style="position:relative;min-width:400px;max-width:800px;width:400px;">',
                                            '<img class="img-responsive" width="100%" src="{{ imgobj.resize[view].data?imgobj.resize[view].data:\'\' }}" />',
                                            '<div class="wliu-image-crop">',
                                                '<div class="wliu-image-crop-h"></div>',
                                                '<div class="wliu-image-crop-v"></div>',
                                            '</div>',
                                        '</div>',
                                    '</div>',
                                    '<div style="text-align:center;">',

                                        '<button ng-click="reset()" title="Restore Image" class="btn btn-outline-success waves-effect pull-right {{ imgobj.resize[view].data?\'\':\'disabled\' }}" style="display:inline-block;position:relative;text-transform:none;height:20px;line-height:20px;padding:2px 8px;margin:0px 2px;">',
                                        '<a class="wliu-btn16 wliu-btn16-restore"></a>',
                                        ' Reset</button>',

                                        '<button ng-click="crop()" title="Crop Image" class="btn btn-outline-primary waves-effect pull-right {{ imgobj.resize[view].data?\'\':\'disabled\' }}" style="display:inline-block;position:relative;text-transform:none;height:20px;line-height:20px;padding:2px 8px;margin:0px 2px;">',
                                        '<a class="wliu-btn16 wliu-btn16-crop"></a>',
                                        ' Crop</button>',

                                        '<button ng-click="rotate()" title="Rotate Image" class="btn btn-outline-primary waves-effect pull-right {{ imgobj.resize[view].data?\'\':\'disabled\' }}" style="display:inline-block;position:relative;text-transform:none;height:20px;line-height:20px;padding:2px 8px;margin:0px 2px;">',
                                        '<a class="wliu-btn16 wliu-btn16-rotate-right"></a>',
                                        ' Rotate</button>',

                                        '<button ng-click="save()" title="Upload Image" class="btn btn-outline-secondary pull-left waves-effect {{ imgobj.resize[view].data?\'\':\'disabled\' }}" style="display:inline-block;position:relative;text-transform:none;height:20px;line-height:20px;padding:2px 8px;margin:0px 2px;">',
                                        '<a class="wliu-btn16 wliu-btn16-okey"></a>',
                                        ' Save</button>',

                                        '<button ng-click="dispose()" title="Cancel Upload" class="btn btn-outline-warning pull-left waves-effect" style="display:inline-block;position:relative;text-transform:none;height:20px;line-height:20px;padding:2px 8px;margin:0px 2px;">',
                                        '<a class="wliu-btn16 wliu-btn16-dispose"></a>',
                                        ' Cancel</button>',

                                    '</div>',
                                '</div>',
                            '</div>',
                        '</div>',


                    '</span>'
                ].join(''),
        controller: function ($scope) {
            $scope.imgobj       = new WLIU.IMAGE({rowsn: guid()});
            $scope.imgeditor    = "#" + $scope.form.scope + "_" + $scope.name + "_" + $scope.imgobj.rowsn; 
            $scope.minww    = $scope.minww?$scope.minww:"120";
            $scope.minhh    = $scope.minhh?$scope.minhh:"80";
            $scope.view     = $scope.form.colMeta($scope.name).view?$scope.form.colMeta($scope.name).view:"medium";
            

            $scope.clickImage = function() {
                if( !$scope.imgobj.resize.origin.data ) {
                    $scope.imgobj.resize.origin.data = $scope.form.getCol($scope.name, $scope.rowsn).value;
                    FIMAGE.setView($scope.view);  // important to make ng-model data sync with the callback
                    FIMAGE.resizeAll($scope.imgobj, function(){
                        $($scope.imgeditor).trigger("show");
                        FIMAGE.cropDivReset( $("div.wliu-image-crop", $scope.imgeditor) );
                        $scope.$apply();  // async must apply
                    });
                } else {
                    $($scope.imgeditor).trigger("show");
                    FIMAGE.cropDivReset( $("div.wliu-image-crop", $scope.imgeditor) );
                }
            }

            $scope.printImage = function() {
                if(  $scope.form.getCol($scope.name, $scope.rowsn).value ) {
                    FFILE.exportDataURL($scope.form.getCol($scope.name, $scope.rowsn).value);
                }
            }
            
            $scope.deleteImage = function() {
                 $scope.form.getCol($scope.name, $scope.rowsn).value = "";
                 $scope.form.changeCol($scope.name, $scope.rowsn);
            }

            $scope.selectFile = function(event) {
                files = (event.srcElement || event.target).files;
                var view = $scope.form.colMeta($scope.name).view?$scope.form.colMeta($scope.name).view:"medium";
                FIMAGE.view = $scope.view;
                FIMAGE.fromFile($scope.imgobj, files[0], function(fObj){
                    if(fObj.errorCode) {
                        alert(fObj.errorMessage);
                    } else {
                        $scope.form.getCol($scope.name, $scope.rowsn).value = $scope.imgobj.resize[view].data?$scope.imgobj.resize[view].data:"";
                        $scope.form.changeCol($scope.name, $scope.rowsn);
                        $scope.$apply();  // important: it is async to read image in callback

                        $($scope.imgeditor).trigger("show");
                        FIMAGE.cropDivReset( $("div.wliu-image-crop", $scope.imgeditor) );
                        
                    }
                });
            }


            /****************************************************** */
            $scope.rotate = function() {
                FIMAGE.rotate($scope.imgobj, function(oImg){
                    FIMAGE.cropDivReset( $("div.wliu-image-crop", $scope.imgeditor) );
                    $scope.$apply();
                });
            }

            $scope.crop = function() {
                FIMAGE.cropDiv($scope.imgobj, $("div.wliu-image-frame", $scope.imgeditor), $("div.wliu-image-crop", $scope.imgeditor), function(oImg){
                    FIMAGE.cropDivReset( $("div.wliu-image-crop", $scope.imgeditor) );
                    $scope.$apply();
                });
            }

            $scope.reset = function() {
                FIMAGE.cropReset($scope.imgobj, function(oImg){
                    FIMAGE.cropDivReset( $("div.wliu-image-crop", $scope.imgeditor) );
                    $scope.$apply();
                });
            }

            $scope.save = function() {
                if($scope.imgobj.resize.origin.data!="") {
					$scope.form.setImage($scope.name, $scope.rowsn, $scope.imgobj);
                    $scope.form.changeCol($scope.name, $scope.rowsn);
                    $scope.dispose();
                }
            }

            $scope.dispose = function() {
                FIMAGE.cropDivReset( $("div.wliu-image-crop", $scope.imgeditor) );
                if( !$scope.$root.$$phase) $scope.$apply();
                $($scope.imgeditor).trigger("hide");
            }
            
        },
        link: function (sc, el, attr) {
            $(function(){
                var ratio = 0;
                if( sc.ww && sc.hh ) {
                    var ratio = parseInt(sc.ww)/parseInt(sc.hh);
                } 

                // remove all image editor dialog which record has bee disposed.
                $("body > div[disposable]").each(function(img_idx, img_editor) {
                    if( $("div.img-content[targeid='" + $(img_editor).attr("id") + "']").length<=0 ) $(img_editor).remove();
                });

                $("body>" + sc.imgeditor).remove();
                $(sc.imgeditor).appendTo("body");

                $(sc.imgeditor).wliuDiag({});
                $("div.wliu-image-crop", sc.imgeditor).draggable({
                    containment: "parent"
                });
                $("div.wliu-image-crop", sc.imgeditor).resizable({ 
                    aspectRatio: ratio,
                    containment: "parent"
                });

            });


            $("div.img-content > img", el).unbind("load").bind("load", function(evt){
                var img = evt.target;
                var i_ww = img.naturalWidth;
                var i_hh = img.naturalHeight;
                var img_rate = i_hh / i_ww;
                
                if( !sc.ww && !sc.hh ) {
                    $(img).css("width", "100%");
                } else { 
                    $(img).css("width","");
                    if( sc.ww && sc.hh ) {
                        var rate_ww = 1;
                        var rate_hh = 1;
                        rate_ww = sc.ww / img.naturalWidth;
                        rate_hh = sc.hh / img.naturalHeight;
                        var rate = Math.min(rate_ww, rate_hh);
                        if(rate < 1) {
                            if(rate_ww < rate_hh) {
                                i_ww 	= sc.ww;
                                i_hh 	= sc.ww * img_rate;
                            } else { 
                                i_hh 	= sc.hh;
                                i_ww	= sc.hh / img_rate;
                            }
                        }
                    } else if(sc.ww) {
                        i_ww        = sc.ww;
                        i_hh        = sc.ww * img_rate;
                    } else if(sc.hh) {
                        i_hh        = sc.hh;
                        i_ww        = sc.hh / img_rate;
                        img.width   = i_ww;
                        img.height  = i_hh;
                    }
                } // if

                img.width   = i_ww;
                img.height  = i_hh;  
            });

        }
    }
});

wliu_form.directive("form.label", function () {
    return {
        restrict: "E",
        replace: true,
        scope: {
            form:      "=",
            name:       "@",
            tooltip:    "@"
        },
        template: [
                    '<label class="wliuCommon-label" scope="{{ form.scope }}" ',
                        'popup-target="{{tooltip?\'#\'+tooltip:\'\'}}" popup-toggle="hover" popup-body="{{form.colMeta(name).coldesc?form.colMeta(name).coldesc:form.colMeta(name).colname?form.colMeta(name).colname:name}}" ',
                        'title="{{tooltip? \'\':form.colMeta(name).coldesc?form.colMeta(name).coldesc:form.colMeta(name).colname?form.colMeta(name).colname:name}}" ',
                    '>',
                        '<span style="vertival-align:middle;">{{ form.colMeta(name).colname?form.colMeta(name).colname:name }}</span>',
                        '<span style="vertival-align:middle;" class="wliuCommon-text-error" ng-if="form.colMeta(name).notnull"> <b>*</b></span>',
                    '</label>'
                ].join(''),
        controller: function ($scope) {
        },
        link: function (sc, el, attr) {
        }
    }
});

wliu_form.directive("form.html", function ($sce) {
    return {
        restrict: "E",
        replace: true,
        scope: {
            form:      "=",
            rowsn:      "@",
            name:       "@"
        },
        template: [
                    '<span scope="{{ form.scope }}" ng-bind-html="getHTML()" ng-hide="form.relationHide(rowsn, name)"></span>'
                ].join(''),
        controller: function ($scope, $sce) {
            $scope.getHTML = function() {
                if( $scope.form.getCol($scope.name, $scope.rowsn) )
                    return $sce.trustAsHtml($scope.form.getCol($scope.name, $scope.rowsn).value);
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

wliu_form.directive("form.text", function () {
    return {
        restrict: "E",
        replace: true,
        scope: {
            form:      "=",
            rowsn:      "@",
            name:       "@",
            tooltip:    "@"
        },
        template: [
                    '<span class="wliu-text" scope="{{ form.scope }}" ng-hide="form.relationHide(rowsn, name)" ',
                        'ng-class="{ \'wliuCommon-input-invalid\': form.getCol(name, rowsn).errorCode }" ',
                        'popup-target="{{tooltip?\'#\'+tooltip:\'\'}}" popup-toggle="hover" popup-body="{{form.getCol(name, rowsn).errorCode?form.getCol(name, rowsn).errorMessage.nl2br():form.colMeta(name).coldesc?form.colMeta(name).coldesc:form.colMeta(name).colname}}" ',
                        'title="{{ tooltip?\'\':form.getCol(name, rowsn).errorCode?form.getCol(name, rowsn).errorMessage:form.colMeta(name).coldesc?form.colMeta(name).coldesc:form.colMeta(name).colname}}"',
                    '>',
                        '{{ form.getCol(name, rowsn).value }}',
                    '</span>'
                ].join(''),
        controller: function ($scope) {
        },
        link: function (sc, el, attr) {
        }
    }
});

wliu_form.directive("form.hidden", function () {
    return {
        restrict: "E",
        replace: true,
        transclude: true,
        scope: {
            form:      "=",
            rowsn:      "@",
            name:       "@"
        },
        template: [
                    '<span>',
                        '<input type="hidden" scope="{{ form.scope }}" ',
                            'ng-model="form.getCol(name, rowsn).value" ',
                            'ng-change="form.changeCol(name, rowsn)" ',
                            'ng-disabled="form.getCol(name, rowsn)==undefined" ',
                        '/>',
                    '</span>'
                ].join(''),
        controller: function ($scope) {
        }
    }
});

wliu_form.directive("form.textbox", function () {
    return {
        restrict: "E",
        replace: true,
        scope: {
            form:      "=",
            rowsn:      "@",
            name:       "@",
            tooltip:    "@"
        },
        template: [
                    '<input type="textbox" scope="{{ form.scope }}" ng-hide="form.relationHide(rowsn, name)" ',
                        //'ng-init="col=form.getCol(name, rowsn)" ',
                        'ng-class="{ \'wliuCommon-input-invalid\': form.getCol(name, rowsn).errorCode }" ',
                        'ng-model="form.getCol(name, rowsn).value" ',
                        'ng-change="form.changeCol(name, rowsn)" ',
                        'ng-disabled="form.getCol(name, rowsn)==undefined" ',
                        'ng-model-options="{ updateOn:\'default blur\', debounce:{default: 500, blur:0} }" ',

                        'popup-target="{{tooltip?\'#\'+tooltip:\'\'}}" popup-toggle="hover" popup-body="{{form.getCol(name, rowsn).errorCode?form.getCol(name, rowsn).errorMessage.nl2br():form.colMeta(name).coldesc?form.colMeta(name).coldesc:form.colMeta(name).colname}}" ',
                        'title="{{tooltip? \'\':form.getCol(name, rowsn).errorCode?form.getCol(name, rowsn).errorMessage:form.colMeta(name).coldesc?form.colMeta(name).coldesc:form.colMeta(name).colname}}" ',
                    '/>'
                ].join(''),
        controller: function ($scope) {
        },
        link: function (sc, el, attr) {
        }
    }
});

wliu_form.directive("form.password", function () {
    return {
        restrict: "E",
        replace: true,
        scope: {
            form:      "=",
            rowsn:      "@",
            name:       "@",
            tooltip:    "@"
        },
        template: [
                    '<input type="password" scope="{{ form.scope }}" placeholder="Password" ng-hide="form.relationHide(rowsn, name)" ',
                        //'ng-init="col=form.getCol(name, rowsn)" ',
                        'ng-class="{ \'wliuCommon-input-invalid\': form.getCol(name, rowsn).errorCode }" ',
                        'ng-model="form.getCol(name, rowsn).value" ',
                        'ng-change="form.changeCol(name, rowsn)" ',
                        'ng-disabled="form.getCol(name, rowsn)==undefined" ',
                        'ng-model-options="{ updateOn:\'default blur\', debounce:{default: 500, blur:0} }" ',

                        'popup-target="{{tooltip?\'#\'+tooltip:\'\'}}" popup-toggle="hover" popup-body="{{form.getCol(name, rowsn).errorCode?form.getCol(name, rowsn).errorMessage.nl2br():form.colMeta(name).coldesc?form.colMeta(name).coldesc:form.colMeta(name).colname}}" ',
                        'title="{{tooltip?\'\':form.getCol(name, rowsn).errorCode?form.getCol(name, rowsn).errorMessage:form.colMeta(name).coldesc?form.colMeta(name).coldesc:form.colMeta(name).colname}}" ',
                    '/>'
                ].join(''),
        controller: function ($scope) {
        },
        link: function (sc, el, attr) {
        }
    }
});

wliu_form.directive("form.passpair", function () {
    return {
        restrict: "E",
        replace: true,
        scope: {
            form:      "=",
            rowsn:      "@",
            name:       "@",
            tooltip:    "@"
        },
        template: [
                    '<span style="display:inline-block;vertical-align:top;" ng-hide="form.relationHide(rowsn, name)">',
                    '<input type="password" style="box-sizing:border-box;width:100%;" scope="{{ form.scope }}" placeholder="Password" ',
                        'ng-class="{ \'wliuCommon-input-invalid\': form.getCol(name, rowsn).errorCode }" ',
                        'ng-model="form.getCol(name, rowsn).value.password" ',
                        'ng-change="passChange()" ',
                        'ng-disabled="form.getCol(name, rowsn)==undefined" ',
                        'ng-model-options="{ updateOn:\'default blur\', debounce:{default: 500, blur:0} }" ',

                        'popup-target="{{tooltip?\'#\'+tooltip:\'\'}}" popup-toggle="hover" popup-body="{{form.getCol(name, rowsn).errorCode?form.getCol(name, rowsn).errorMessage.nl2br():\'\'}}" ',
                        'title="{{tooltip?\'\':form.getCol(name, rowsn).errorCode?form.getCol(name, rowsn).errorMessage:\'\'}}" ',
                    '/>',
                    '<input type="password" style="box-sizing:border-box;width:100%;" scope="{{ form.scope }}" placeholder="Confirm Password" ',
                        'ng-class="{ \'wliuCommon-input-invalid\': form.getCol(name, rowsn).value.password!=form.getCol(name, rowsn).value.confirm }" ',
                        'ng-model="form.getCol(name, rowsn).value.confirm" ',
                        //'ng-change="confirmChange()" ',
                        'ng-disabled="form.getCol(name, rowsn)==undefined" ',
                        'ng-model-options="{ updateOn:\'default blur\', debounce:{default: 500, blur:0} }" ',

                        'popup-target="{{tooltip?\'#\'+tooltip:\'\'}}" popup-toggle="hover" popup-body="{{form.getCol(name, rowsn).value.password!=form.getCol(name, rowsn).value.confirm ?\'Password not match!\':\'\'}}" ',
                        'title="{{tooltip?\'\':form.getCol(name, rowsn).value.password!=form.getCol(name, rowsn).value.confirm?\'Password not match!\':\'\'}}" ',
                    '/>',
                    '</span>'
                ].join(''),
        controller: function ($scope) {
            $scope.passChange = function() {
                $scope.form.changeCol($scope.name, $scope.rowsn);
                //$scope.confirmChange();
            }
            /*
            $scope.confirmChange = function() {
                if( $scope.form.getCol($scope.name, $scope.rowsn).value.password == $scope.form.getCol($scope.name, $scope.rowsn).value.confirm ) {
                    $scope.form.colErrorByIndex($scope.rowsn, $scope.name, {errorCode:0, errorMessage:""});
                } else {
                    $scope.form.colErrorByIndex($scope.rowsn, $scope.name, {errorCode:1, errorMessage:"Password not match"});
                }
            }
            */
        },
        link: function (sc, el, attr) {
        }
    }
});

wliu_form.directive("form.textarea", function () {
    return {
        restrict: "E",
        replace: true,
        scope: {
            form:      "=",
            rowsn:      "@",
            name:       "@",
            tooltip:    "@"
        },
        template: [
                    '<textarea scope="{{ form.scope }}" ng-hide="form.relationHide(rowsn, name)" ',
                        //'ng-init="col=form.getCol(name, rowsn)" ',
                        'ng-class="{ \'wliuCommon-input-invalid\': form.getCol(name, rowsn).errorCode }" ',
                        'ng-model="form.getCol(name, rowsn).value" ',
                        'ng-change="form.changeCol(name, rowsn)" ',
                        'ng-disabled="form.getCol(name, rowsn)==undefined" ',
                        'ng-model-options="{ updateOn:\'default blur\', debounce:{default: 500, blur:0} }" ',

                        'popup-target="{{tooltip?\'#\'+tooltip:\'\'}}" popup-toggle="hover" popup-body="{{form.getCol(name, rowsn).errorCode?form.getCol(name, rowsn).errorMessage.nl2br():form.colMeta(name).coldesc?form.colMeta(name).coldesc:form.colMeta(name).colname}}" ',
                        'title="{{tooltip?\'\':form.getCol(name, rowsn).errorCode?form.getCol(name, rowsn).errorMessage:form.colMeta(name).coldesc?form.colMeta(name).coldesc:form.colMeta(name).colname}}" ',
                    '>',
                    '</textarea>'
                ].join(''),
        controller: function ($scope) {
        },
        link: function (sc, el, attr) {
        }
    }
});

wliu_form.directive("form.select", function () {
    return {
        restrict: "E",
        replace: true,
        scope: {
            form:      "=",
            rowsn:      "@",
            name:       "@",
            tooltip:    "@"
        },
        template: [
			    '<select scope="{{ form.scope }}" ng-hide="form.relationHide(rowsn, name)" ',
                        'ng-class="{ \'wliuCommon-input-invalid\': form.getCol(name, rowsn).errorCode }" ',
                        'ng-model="form.getCol(name, rowsn).value" ',
                        'ng-change="form.changeCol(name, rowsn)" ',
                        'ng-disabled="form.getCol(name, rowsn)==undefined" ',
                        'ng-options="sObj.key as sObj.value for sObj in form.lists[form.colMeta(name).list].list" ',                        
                        'popup-target="{{tooltip?\'#\'+tooltip:\'\'}}" popup-toggle="hover" popup-body="{{form.getCol(name, rowsn).errorCode?form.getCol(name, rowsn).errorMessage.nl2br():form.colMeta(name).coldesc?form.colMeta(name).coldesc:form.colMeta(name).colname}}" ',
                        'title="{{tooltip?\'\':form.getCol(name, rowsn).errorCode?form.getCol(name, rowsn).errorMessage:form.colMeta(name).coldesc?form.colMeta(name).coldesc:form.colMeta(name).colname}}"',
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

wliu_form.directive("form.relation", function () {
    return {
        restrict: "E",
        replace: true,
        scope: {
            form:      "=",
            rowsn:      "@",
            name:       "@",
            label:      "@",
            tooltip:    "@"
        },
        template: [
                    '<span class="checkbox" scope="{{ form.scope }}" ',
                        'ng-class="{ \'wliuCommon-input-invalid\': form.getCol(name, rowsn).errorCode }" ',
                        'popup-target="{{tooltip?\'#\'+tooltip:\'\'}}" popup-toggle="hover" popup-body="{{form.getCol(name, rowsn).errorCode?form.getCol(name, rowsn).errorMessage.nl2br():form.colMeta(name).coldesc?form.colMeta(name).coldesc:form.colMeta(name).colname}}" ',
                        'title="{{tooltip==\'1\'?\'\':form.getCol(name, rowsn).errorCode?form.getCol(name, rowsn).errorMessage:form.colMeta(name).coldesc?form.colMeta(name).coldesc:form.colMeta(name).colname}}" ',
                    '>',
                            '<input type="checkbox" scope="{{ form.scope }}" id="{{form.scope}}_{{name}}_{{rowsn}}" ',
                                'ng-model="form.getCol(name, rowsn).value" ng-value="1"  ',
                                'ng-change="form.relationChange(rowsn); form.changeCol(name, rowsn);" ',
                                'ng-disabled="form.getCol(name, rowsn)==undefined" ',
                            '/>',

                            '<label for="{{form.scope}}_{{name}}_{{rowsn}}" title="{{form.colMeta(name).coldesc?form.colMeta(name).coldesc:form.colMeta(name).colname?form.colMeta(name).colname:name}}">',
                                //'<abbr title="{{rdObj.desc}}" ng-if="rdObj.desc!=\'\'">{{ rdObj.value }}</abbr>',
                                '{{ label.toLowerCase()=="default"?form.colMeta(name).colname:label?label:"" }}',
                            '</label>',

                    '</span>',
                ].join(''),
        controller: function ($scope) {
        },
        link: function (sc, el, attr) {
        }
    }
});

wliu_form.directive("form.bool", function () {
    return {
        restrict: "E",
        replace: true,
        scope: {
            form:      "=",
            rowsn:      "@",
            name:       "@",
            label:      "@",
            tooltip:    "@"
        },
        template: [
                    '<span class="checkbox" scope="{{ form.scope }}" ng-hide="form.relationHide(rowsn, name)" ',
                        'ng-class="{ \'wliuCommon-input-invalid\': form.getCol(name, rowsn).errorCode }" ',
                        'popup-target="{{tooltip?\'#\'+tooltip:\'\'}}" popup-toggle="hover" popup-body="{{form.getCol(name, rowsn).errorCode?form.getCol(name, rowsn).errorMessage.nl2br():form.colMeta(name).coldesc?form.colMeta(name).coldesc:form.colMeta(name).colname}}" ',
                        'title="{{tooltip==\'1\'?\'\':form.getCol(name, rowsn).errorCode?form.getCol(name, rowsn).errorMessage:form.colMeta(name).coldesc?form.colMeta(name).coldesc:form.colMeta(name).colname}}" ',
                    '>',

                            '<input type="checkbox" scope="{{ form.scope }}" id="{{form.scope}}_{{name}}_{{rowsn}}" ',
                                'ng-model="form.getCol(name, rowsn).value" ng-value="1"  ',
                                'ng-change="form.changeCol(name, rowsn)" ',
                                'ng-disabled="form.getCol(name, rowsn)==undefined" ',
                            '/>',

                            '<label for="{{form.scope}}_{{name}}_{{rowsn}}" title="{{form.colMeta(name).coldesc?form.colMeta(name).coldesc:form.colMeta(name).colname?form.colMeta(name).colname:name}}">',
                                //'<abbr title="{{rdObj.desc}}" ng-if="rdObj.desc!=\'\'">{{ rdObj.value }}</abbr>',
                                '{{ label.toLowerCase()=="default"?form.colMeta(name).colname:label?label:"" }}',
                            '</label>',

                    '</span>',
                ].join(''),
        controller: function ($scope) {
        },
        link: function (sc, el, attr) {
        }
    }
});

wliu_form.directive("form.datetime", function () {
    return {
        restrict: "E",
        replace: true,
        scope: {
            form:      "=",
            rowsn:      "@",
            name:       "@",
            tooltip:    "@"
        },
        template: [
                    '<span  ng-hide="form.relationHide(rowsn, name)" ',
                        //'ng-init="form.getCol(name, rowsn).value=$.isPlainObject(form.getCol(name, rowsn).value)?form.getCol(name, rowsn).value:{}" ',
                        'popup-target="{{tooltip?\'#\'+tooltip:\'\'}}" popup-toggle="hover" popup-body="{{form.getCol(name, rowsn).errorCode?form.getCol(name, rowsn).errorMessage.nl2br():form.colMeta(name).coldesc?form.colMeta(name).coldesc:form.colMeta(name).colname}}" ',
                        'title="{{tooltip?\'\':form.getCol(name, rowsn).errorCode?form.getCol(name, rowsn).errorMessage:form.colMeta(name).coldesc?form.colMeta(name).coldesc:form.colMeta(name).colname}}"',                    
                    '>',
                        '<input type="textbox" class="wliuCommon-datepicker" scope="{{ form.scope }}" placeholder="yyyy-mm-dd" ',
                            'ng-class="{ \'wliuCommon-input-invalid\': form.getCol(name, rowsn).errorCode }" ',
                            'ng-model="form.getCol(name, rowsn).value.date" ',
                            'ng-change="form.changeCol(name, rowsn)" ',
                            'ng-disabled="form.getCol(name, rowsn)==undefined" ',
                        '/>',
                        '<input type="textbox" class="wliuCommon-timepicker" scope="{{ form.scope }}" placeholder="hh:mm" ',
                            //'ng-init="col=form.getCol(name, rowsn)" ',
                            'ng-class="{ \'wliuCommon-input-invalid\': form.getCol(name, rowsn).errorCode }" ',
                            'ng-model="form.getCol(name, rowsn).value.time" ',
                            'ng-change="form.changeCol(name, rowsn)" ',
                            'ng-disabled="form.getCol(name, rowsn)==undefined" ',
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

wliu_form.directive("form.date", function () {
    return {
        restrict: "E",
        replace: true,
        scope: {
            form:      "=",
            rowsn:      "@",
            name:       "@",
            tooltip:    "@"
        },
        template: [
                    '<input type="textbox" class="wliuCommon-datepicker" scope="{{ form.scope }}" placeholder="yyyy-mm-dd" ng-hide="form.relationHide(rowsn, name)" ',
                        //'ng-init="col=form.getCol(name, rowsn)" ',
                        'ng-class="{ \'wliuCommon-input-invalid\': form.getCol(name, rowsn).errorCode }" ',
                        'ng-model="form.getCol(name, rowsn).value" ',
                        'ng-change="form.changeCol(name, rowsn)" ',
                        'ng-disabled="form.getCol(name, rowsn)==undefined" ',
                        'popup-target="{{tooltip?\'#\'+tooltip:\'\'}}" popup-toggle="hover" popup-body="{{form.getCol(name, rowsn).errorCode?form.getCol(name, rowsn).errorMessage.nl2br():form.colMeta(name).coldesc?form.colMeta(name).coldesc:form.colMeta(name).colname}}" ',
                        'title="{{tooltip?\'\':form.getCol(name, rowsn).errorCode?form.getCol(name, rowsn).errorMessage:form.colMeta(name).coldesc?form.colMeta(name).coldesc:form.colMeta(name).colname}}" ',
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

wliu_form.directive("form.time", function () {
    return {
        restrict: "E",
        replace: true,
        scope: {
            form:      "=",
            rowsn:      "@",
            name:       "@",
            tooltip:    "@"
        },
        template: [
                    '<input type="textbox" class="wliuCommon-timepicker" scope="{{ form.scope }}" placeholder="hh:mm" ng-hide="form.relationHide(rowsn, name)" ',
                        //'ng-init="col=form.getCol(name, rowsn)" ',
                        'ng-class="{ \'wliuCommon-input-invalid\': form.getCol(name, rowsn).errorCode }" ',
                        'ng-model="form.getCol(name, rowsn).value" ',
                        'ng-change="form.changeCol(name, rowsn)" ',
                        'ng-disabled="form.getCol(name, rowsn)==undefined" ',
                        'popup-target="{{tooltip?\'#\'+tooltip:\'\'}}" popup-toggle="hover" popup-body="{{form.getCol(name, rowsn).errorCode?form.getCol(name, rowsn).errorMessage.nl2br():form.colMeta(name).coldesc?form.colMeta(name).coldesc:form.colMeta(name).colname}}" ',
                        'title="{{tooltip?\'\':form.getCol(name, rowsn).errorCode?form.getCol(name, rowsn).errorMessage:form.colMeta(name).coldesc?form.colMeta(name).coldesc:form.colMeta(name).colname}}" ',
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

wliu_form.directive("form.intdate", function () {
    return {
        restrict: "E",
        replace: true,
        transclude: true,
        scope: {
            form:      "=",
            rowsn:      "@",
            name:       "@",
            format:     "@"
        },
        template: [
                    '<span ng-hide="form.relationHide(rowsn, name)">{{ form.getCol(name, rowsn).value?(form.getCol(name, rowsn).value>0?(form.getCol(name, rowsn).value * 1000 | date : (format?format:"yyyy-MM-dd H:mm") ):"") :"" }}</span>'
				  ].join(''),
        controller: function ($scope) {
        }
    }
});

wliu_form.directive("form.checkbox", function () {
    return {
        restrict: "E",
        replace: true,
        scope: {
            form:      "=",
            name:       "@",
            rowsn:      "@",
            colnum:     "@",
            tooltip:    "@"
        },
        template: [
                    '<div  scope="{{ form.scope }}" ng-hide="form.relationHide(rowsn, name)" ',
                        //'ng-init="form.getCol(name, rowsn).value=$.isPlainObject(form.getCol(name, rowsn).value)?form.getCol(name, rowsn).value:{}" ',
                        'ng-class="{ \'wliuCommon-input-invalid\': form.getCol(name, rowsn).errorCode }" ',
                        'popup-target="{{tooltip?\'#\'+tooltip:\'\'}}" popup-toggle="hover" popup-body="{{form.getCol(name, rowsn).errorCode?form.getCol(name, rowsn).errorMessage.nl2br():form.colMeta(name).coldesc?form.colMeta(name).coldesc:form.colMeta(name).colname}}" ',
                        'title="{{tooltip?\'\':form.getCol(name, rowsn).errorCode?form.getCol(name, rowsn).errorMessage:form.colMeta(name).coldesc?form.colMeta(name).coldesc:form.colMeta(name).colname}}" ',
                    '>',
                        '<span ',
                            //'ng-init="form.getCol(name, rowsn).value=form.getCol(name, rowsn).value?form.getCol(name, rowsn).value:{};" ',                          
                            'ng-repeat="rdObj in form.lists[form.colMeta(name).list].list">',
                                '<span class="checkbox">',

                                        '<input type="checkbox" scope="{{ form.scope }}" id="{{form.scope}}_{{name}}_{{rowsn}}_{{rdObj.key}}" ',
                                            'ng-model="form.getCol(name, rowsn).value[rdObj.key]" ng-value="rdObj.key"  ',
                                            'ng-change="form.changeCol(name, rowsn)" ',
                                            'ng-disabled="form.getCol(name, rowsn)==undefined" ',
                                        '/>',

                                        '<label for="{{form.scope}}_{{name}}_{{rowsn}}_{{rdObj.key}}" title="{{rdObj.desc?rdObj.desc:rdObj.value}}">',
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

wliu_form.directive("form.checkbox1", function () {
    return {
        restrict: "E",
        replace: true,
        scope: {
            form:      "=",
            rowsn:      "@",
            name:       "@",
            targetid:   "@",
            tooltip:    "@"
        },
        template: [
                    '<input type="text" readonly scope="{{ form.scope }}" class="wliuCommon-checklist" value="{{ valueText() }}" ng-hide="form.relationHide(rowsn, name)" ',
                            'ng-click="change(rowsn, name)" ',
                            'ng-class="{ \'wliuCommon-input-invalid\': form.getCol(name, rowsn).errorCode }" ',
                            'diag-target="#{{targetid}}" diag-toggle="click" ',
                            'popup-target="{{tooltip?\'#\'+tooltip:\'\'}}" popup-toggle="hover" popup-body="{{form.getCol(name, rowsn).errorCode?form.getCol(name, rowsn).errorMessage.nl2br():valueText()?valueText():form.colMeta(name).coldesc?form.colMeta(name).coldesc:form.colMeta(name).colname}}" ',
                            'title="{{tooltip?\'\':form.getCol(name, rowsn).errorCode?form.getCol(name, rowsn).errorMessage:valueText()?valueText():form.colMeta(name).coldesc?form.colMeta(name).coldesc:form.colMeta(name).colname}}" ',
                    '/>'
                ].join(''),
        controller: function ($scope) {
            $scope.form.lists[ $scope.form.colMeta($scope.name).list ].keys = $scope.form.lists[ $scope.form.colMeta($scope.name).list ].keys || {};
            $scope.change = function(rowsn, name) {
                $scope.form.lists[ $scope.form.colMeta($scope.name).list ].keys.rowsn = rowsn;
                $scope.form.lists[ $scope.form.colMeta($scope.name).list ].keys.name = name;
            }
            $scope.valueText = function() {
                    var text = $.map( $scope.form.lists[$scope.form.colMeta($scope.name).list].list , function(n) {
                    if( $scope.form.getCol($scope.name, $scope.rowsn)!= undefined ) {
                        if($scope.form.getCol($scope.name, $scope.rowsn).value[n.key]) 
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

wliu_form.directive("form.checkdiag1", function () {
    return {
        restrict: "E",
        replace: true,
        scope: {
            form:      "=",
            name:       "@",
            targetid:   "@",
            colnum:     "@",
            bar:        "@",
            title:      "@"
        },
        template: [
                    '<div id="{{targetid}}" wliu-diag movable maskable scope="{{ form.scope }}" ',
                        //'ng-init="form.getCol( form.lists[name].keys.name, form.lists[name].keys.rowsn ).value=$.isPlainObject(form.getCol( form.lists[name].keys.name, form.lists[name].keys.rowsn ).value)?form.getCol( form.lists[name].keys.name, form.lists[name].keys.rowsn ).value:{}" ',
                    '>',
                        '<div wliu-diag-head>{{ title }}</div>',
                        '<a class="wliu-btn24 wliu-btn24-selectlist" ng-show="bar==1">',
                            '<div class="wliu-selectlist">',
                                '<div class="wliu-selectlist-title info-color text-center">SELECTED</div>',
                                '<ul class="wliu-selectlist-content">',
                                    '<li ng-repeat="vObj in valueArr(form.lists[name].keys.rowsn, form.lists[name].keys.name)">',
                                    '{{ vObj.value }}',
                                    '</li>',
                                '</ul>',
                            '</div>',
                        '</a>',

                        '<input type="text" class="wliuCommon-search" ng-model="search" ng-model-options="{ updateOn:\'default blur\', debounce:{default: 500, blur:0} }" ng-show="bar==1" />',
                        '<a class="wliu-btn24 wliu-btn24-checkall" ng-click="checkall(form.lists[name].keys.rowsn, form.lists[name].keys.name)" title="check all"  ng-show="bar==1"></a>',
                        '<a class="wliu-btn24 wliu-btn24-removeall" ng-click="removeall(form.lists[name].keys.rowsn, form.lists[name].keys.name)" title="remove all"  ng-show="bar==1"></a>',
                        '<div class="wliu-underline" ng-show="bar==1"></div>',
                        '<div class="wliu-diag-body" style="font-size:14px;">',
                        '<span ',
                            'ng-repeat="rdObj in form.lists[name].list|filter:search">',
                                '<span class="checkbox">',

                                        '<input type="checkbox" scope="{{ form.scope }}" id="{{form.scope}}_{{name}}_{{rdObj.key}}" ',
                                            'ng-model="form.getCol( form.lists[name].keys.name, form.lists[name].keys.rowsn ).value[rdObj.key]" ng-value="rdObj.key"  ',
                                            'ng-change="form.changeCol(form.lists[name].keys.name, form.lists[name].keys.rowsn)" ',
                                            'ng-disabled="form.getCol( form.lists[name].keys.name, form.lists[name].keys.rowsn )==undefined" ',
                                        '/>',

                                        '<label for="{{form.scope}}_{{name}}_{{rdObj.key}}" title="{{rdObj.desc?rdObj.desc:rdObj.value}}">',
                                            '{{ rdObj.value }}',
                                        '</label>',

                                '</span>',
                                '<br ng-if="colnum>0?(($index+1)%colnum)==0:false" />',
                        '</span>',
                        '</div>',    
                    '</div>'
            
                ].join(''),
        controller: function ($scope) {
            $scope.form.lists[$scope.name].keys = $scope.form.lists[$scope.name].keys || {};
            $scope.change = function(rowsn, name) {
                // $scope.name is  lists[name],   name is colname
                $scope.form.lists[$scope.name].keys.rowsn = rowsn;
                $scope.form.lists[$scope.name].keys.name = name;
            }

            $scope.checkall = function(rowsn, name) {
                $scope.form.getCol( name, rowsn ).value = $scope.form.getCol( name, rowsn ).value || {};
                for( var key in $scope.form.lists[$scope.name].list  ) {
                    $scope.form.getCol( name, rowsn ).value[ $scope.form.lists[$scope.name].list[key].key ] = true;
                }
                $scope.form.changeCol(name, rowsn);
            }

            $scope.removeall = function(rowsn, name) {
                for( var key in $scope.form.lists[$scope.name].list  ) {
                    $scope.form.getCol( name, rowsn ).value = {};
                }
                $scope.form.changeCol(name, rowsn);
            }

            $scope.valueArr = function(rowsn, name) {
               var valueArr = $.map( $scope.form.lists[$scope.name].list , function(n) {
                   if( $scope.form.getCol( name, rowsn )!= undefined  ) {
                        if( $scope.form.getCol( name, rowsn ).value[n.key] ) 
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
                $(el).wliuDiag();
            });
        }
    }
});

wliu_form.directive("form.checklist1", function () {
    return {
        restrict: "E",
        replace: true,
        scope: {
            form:      "=",
            name:       "@",
            rowsn:      "@",
            colnum:     "@",
            bar:        "@",
            title:      "@"
        },
        template: [
                    '<div class="col-md-12" style="border:1px dotted #666666;border-radius:5px; padding:2px; overflow-y:auto;text-align:left; min-width:240px;" scope="{{ form.scope }}" ng-hide="form.relationHide(rowsn, name)" ',
                        //'ng-init="form.getCol( name, rowsn ).value=$.isPlainObject(form.getCol( name, rowsn ).value)?form.getCol( name, rowsn ).value:{}"',
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
                            'ng-repeat="rdObj in form.lists[form.colMeta(name).list].list|filter:search">',
                                '<span class="checkbox">',

                                        '<input type="checkbox" scope="{{ form.scope }}" id="{{form.scope}}_{{name}}_{{rowsn}}_{{rdObj.key}}" ',
                                            'ng-model="form.getCol( name, rowsn ).value[rdObj.key]" ng-value="rdObj.key"  ',
                                            'ng-change="form.changeCol(name, rowsn)" ',
                                            'ng-disabled="form.getCol( name, rowsn )==undefined" ',
                                        '/>',

                                        '<label for="{{form.scope}}_{{name}}_{{rowsn}}_{{rdObj.key}}" title="{{rdObj.desc?rdObj.desc:rdObj.value}}">',
                                            '{{ rdObj.value }}',
                                        '</label>',

                                '</span>',
                                '<br ng-if="colnum>0?(($index+1)%colnum)==0:false" />',
                        '</span>',
                        '</div>',    
                    '</div>'
            
                ].join(''),
        controller: function ($scope) {
            $scope.form.lists[$scope.form.colMeta($scope.name).list].keys = $scope.form.lists[$scope.form.colMeta($scope.name).list].keys || {};

            $scope.checkall = function() {
                $scope.form.getCol($scope.name, $scope.rowsn).value = $scope.form.getCol($scope.name, $scope.rowsn).value || {};
                for( var key in $scope.form.lists[$scope.form.colMeta($scope.name).list].list  ) {
                    $scope.form.getCol($scope.name, $scope.rowsn).value[ $scope.form.lists[$scope.form.colMeta($scope.name).list].list[key].key ] = true;
                }

                $scope.form.changeCol($scope.name, $scope.rowsn);
            }

            $scope.removeall = function() {
                for( var key in $scope.form.lists[$scope.form.colMeta($scope.name).list].list  ) {
                    $scope.form.getCol($scope.name, $scope.rowsn).value = {};
                }
                $scope.form.changeCol($scope.name, $scope.rowsn);
            }

            $scope.valueArr = function() {
               var valueArr = $.map( $scope.form.lists[$scope.form.colMeta($scope.name).list].list , function(n) {
                   if( $scope.form.getCol( $scope.name, $scope.rowsn  )!= undefined  ) {
                        if( $scope.form.getCol( $scope.name, $scope.rowsn  ).value[n.key] ) 
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

wliu_form.directive("form.checkbox2", function () {
    return {
        restrict: "E",
        replace: true,
        scope: {
            form:      "=",
            rowsn:      "@",
            name:       "@",
            targetid:   "@",
            tooltip:    "@"
        },
        template: [
                        '<input type="text" readonly scope="{{ form.scope }}" class="wliuCommon-checklist" value="{{ valueText() }}" ng-hide="form.relationHide(rowsn, name)" ',
                                'ng-click="change(rowsn, name)" ',
                                'ng-class="{ \'wliuCommon-input-invalid\': form.getCol(name, rowsn).errorCode }" ',

                                'diag-target="#{{targetid}}" diag-toggle="click" ',
                                'popup-target="{{tooltip?\'#\'+tooltip:\'\'}}" popup-toggle="hover" popup-body="{{form.getCol(name, rowsn).errorCode?form.getCol(name, rowsn).errorMessage.nl2br():valueText()?valueText():form.colMeta(name).coldesc?form.colMeta(name).coldesc:form.colMeta(name).colname}}" ',
                                'title="{{tooltip?\'\':form.getCol(name, rowsn).errorCode?form.getCol(name, rowsn).errorMessage:valueText()?valueText():form.colMeta(name).coldesc?form.colMeta(name).coldesc:form.colMeta(name).colname}}" ',
                        '/>'
                ].join(''),
        controller: function ($scope) {
            $scope.form.lists[ $scope.form.colMeta($scope.name).list ].keys = $scope.form.lists[ $scope.form.colMeta($scope.name).list ].keys || {};
            $scope.change = function(rowsn, name) {
                $scope.form.lists[ $scope.form.colMeta($scope.name).list ].keys.rowsn = rowsn;
                $scope.form.lists[ $scope.form.colMeta($scope.name).list ].keys.name = name;
            }
            $scope.valueText = function() {
                var ret_text = "";
                for(var key in $scope.form.lists[$scope.form.colMeta($scope.name).list].list) {
                    var dList = $scope.form.lists[$scope.form.colMeta($scope.name).list].list[key].list;
                    var text = $.map( dList , function(n) {
                        if( $scope.form.getCol($scope.name, $scope.rowsn)!=undefined ) {
                            if($scope.form.getCol($scope.name, $scope.rowsn).value[n.key]) 
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

wliu_form.directive("form.checkdiag2", function () {
    return {
        restrict: "E",
        replace: true,
        scope: {
            form:      "=",
            name:       "@",
            targetid:   "@",
            colnum:     "@",
            colnum1:    "@",
            bar:        "@",
            title:      "@"
        },
        template: [
                    '<div id="{{targetid}}" wliu-diag movable maskable class="container" scope="{{ form.scope }}" ',
                        //'ng-init="form.getCol( form.lists[name].keys.name, form.lists[name].keys.rowsn ).value=$.isPlainObject(form.getCol( form.lists[name].keys.name, form.lists[name].keys.rowsn ).value)?form.getCol( form.lists[name].keys.name, form.lists[name].keys.rowsn ).value:{}"',
                    '>',
                        '<div wliu-diag-head>{{ title }}</div>',
                        '<a class="wliu-btn24 wliu-btn24-selectlist" ng-show="bar==1">',
                            '<div class="wliu-selectlist">',
                                '<div class="wliu-selectlist-title info-color text-center">SELECTED</div>',
                                '<ul class="wliu-selectlist-content">',
                                    '<li ng-repeat="vObj in valueArr(form.lists[name].keys.rowsn, form.lists[name].keys.name)">',
                                    '{{ vObj.value }}',
                                    '</li>',
                                '</ul>',
                            '</div>',
                        '</a>',
                        '<input type="text" class="wliuCommon-search" ng-model="search" ng-model-options="{ updateOn:\'default blur\', debounce:{default: 500, blur:0} }" ng-show="bar==1" />',
                        '<a class="wliu-btn24 wliu-btn24-checkall" ng-click="checkall(form.lists[name].keys.rowsn, form.lists[name].keys.name)" title="check all" ng-show="bar==1"></a>',
                        '<a class="wliu-btn24 wliu-btn24-removeall" ng-click="removeall(form.lists[name].keys.rowsn, form.lists[name].keys.name)" title="remove all" ng-show="bar==1"></a>',
                        '<div class="wliu-underline" ng-show="bar==1"></div>',
                        '<div class="wliu-diag-body" style="font-size:14px;">',
                            '<span style="display:none;" ng-repeat-start="rdObj in form.lists[name].list|filter:search"></span>',
                                    '<div class="col-md-{{colnum}} col-sm-{{colnum}} col-xs-12" ng-if="rdObj.list && rdObj.list.length>0">',
                                        '<ul>',
                                            '<li title="{{rdObj.desc?rdObj.desc:rdObj.value}}">',
                                                '<b>{{ rdObj.value }}</b>',
                                                '<ul style="border-top:1px solid #cccccc;">',
                                                        '<span ng-repeat="tdObj in rdObj.list|filter:search">',
                                                            '<span class="checkbox">',
                                                                    '<input type="checkbox" scope="{{ form.scope }}" id="{{form.scope}}_{{name}}_{{tdObj.key}}" ',
                                                                        'ng-model="form.getCol( form.lists[name].keys.name, form.lists[name].keys.rowsn ).value[tdObj.key]" ng-value="tdObj.key"  ',
                                                                        'ng-change="form.changeCol(form.lists[name].keys.name, form.lists[name].keys.rowsn)" ',
                                                                        'ng-disabled="form.getCol( form.lists[name].keys.name, form.lists[name].keys.rowsn )==undefined" ',
                                                                    '/>',

                                                                    '<label for="{{form.scope}}_{{name}}_{{tdObj.key}}" title="{{tdObj.desc?tdObj.desc:tdObj.value}}">',
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
            $scope.form.lists[$scope.name].keys = $scope.form.lists[$scope.name].keys || {};
            $scope.change = function(rowsn, name) {
                // $scope.name is  lists[name],   name is colname
                $scope.form.lists[$scope.name].keys.rowsn = rowsn;
                $scope.form.lists[$scope.name].keys.name = name;
            }

            $scope.checkall = function(rowsn, name) {
                $scope.form.getCol( name, rowsn ).value = $scope.form.getCol( name, rowsn ).value || {};
                for( var key in $scope.form.lists[$scope.name].list  ) {
                    var dList = $scope.form.lists[$scope.name].list[key].list;
                    for( var dkey in dList) {
                        $scope.form.getCol( name, rowsn ).value[ dList[dkey].key ] = true;
                    }
                }

                $scope.form.changeCol(name, rowsn);
            }

            $scope.removeall = function(rowsn, name) {
                for( var key in $scope.form.lists[$scope.name].list  ) {
                    $scope.form.getCol( name, rowsn ).value = {};
                }
                $scope.form.changeCol(name, rowsn);
            }

            $scope.valueArr = function(rowsn, name) {
                var ret_arr = [];
                for(var key in $scope.form.lists[$scope.name].list) {
                    var dList = $scope.form.lists[$scope.name].list[key].list;
                    var valueArr = $.map( dList , function(n) {
                        if( $scope.form.getCol( name, rowsn )!= undefined  ) {
                                if( $scope.form.getCol( name, rowsn ).value[n.key] ) 
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
                $(el).wliuDiag();
            });
        }
    }
});

wliu_form.directive("form.checklist2", function () {
    return {
        restrict: "E",
        replace: true,
        scope: {
            form:      "=",
            name:       "@",
            rowsn:      "@",
            colnum:     "@",
            colnum1:    "@",
            bar:        "@",
            title:      "@"
        },
        template: [
                    '<div class="col-md-12" style="border:1px dotted #666666;border-radius:5px;overflow-y:auto;" scope="{{ form.scope }}" ng-hide="form.relationHide(rowsn, name)" ',
                        //'ng-init="form.getCol( name, rowsn ).value=$.isPlainObject(form.getCol( name, rowsn ).value)?form.getCol( name, rowsn ).value:{}"',
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
                            '<span style="display:none;" ng-repeat-start="rdObj in form.lists[form.colMeta(name).list].list|filter:search"></span>',
                                    '<div class="col-sm-{{colnum}}" ng-if="rdObj.list && rdObj.list.length>0">',
                                        '<ul>',
                                            '<li title="{{rdObj.desc?rdObj.desc:rdObj.value}}">',
                                                '<b>{{ rdObj.value }}</b>',
                                                '<ul style="border-top:1px solid #cccccc;">',
                                                        '<span ng-repeat="tdObj in rdObj.list|filter:search">',
                                                            '<span class="checkbox">',
                                                                    '<input type="checkbox" scope="{{ form.scope }}" id="{{form.scope}}_{{name}}_{{rowsn}}_{{tdObj.key}}" ',
                                                                        'ng-model="form.getCol( name, rowsn ).value[tdObj.key]" ng-value="tdObj.key"  ',
                                                                        'ng-change="form.changeCol(name, rowsn)" ',
                                                                        'ng-disabled="form.getCol( name, rowsn )==undefined" ',
                                                                    '/>',

                                                                    '<label for="{{form.scope}}_{{name}}_{{rowsn}}_{{tdObj.key}}" title="{{tdObj.desc?tdObj.desc:tdObj.value}}">',
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
            $scope.form.lists[$scope.form.colMeta($scope.name).list].keys = $scope.form.lists[$scope.form.colMeta($scope.name).list].keys || {};

            $scope.checkall = function() {
                $scope.form.getCol($scope.name, $scope.rowsn).value = $scope.form.getCol($scope.name, $scope.rowsn).value || {};
                for( var key in $scope.form.lists[$scope.form.colMeta($scope.name).list].list  ) {
                    var dList = $scope.form.lists[$scope.form.colMeta($scope.name).list].list[key].list;
                    for( var dkey in dList) {
                        $scope.form.getCol($scope.name, $scope.rowsn).value[ dList[dkey].key ] = true;
                    }
                }
                $scope.form.changeCol($scope.name, $scope.rowsn);
            }

            $scope.removeall = function() {
                for( var key in $scope.form.lists[$scope.form.colMeta($scope.name).list].list  ) {
                    $scope.form.getCol($scope.name, $scope.rowsn).value = {};
                }
                $scope.form.changeCol($scope.name, $scope.rowsn);
            }

            $scope.valueArr = function() {
                var ret_arr = [];
                for(var key in $scope.form.lists[$scope.form.colMeta($scope.name).list].list) {
                    var dList = $scope.form.lists[$scope.form.colMeta($scope.name).list].list[key].list;
                    var valueArr = $.map( dList , function(n) {
                        if( $scope.form.getCol( $scope.name, $scope.rowsn  )!= undefined  ) {
                                if( $scope.form.getCol( $scope.name, $scope.rowsn  ).value[n.key] ) 
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

wliu_form.directive("form.checkbox3", function () {
    return {
        restrict: "E",
        replace: true,
        scope: {
            form:      "=",
            rowsn:      "@",
            name:       "@",
            targetid:   "@",
            tooltip:    "@"
        },
        template: [
                    '<input type="text" readonly scope="{{ form.scope }}" class="wliuCommon-checklist" value="{{ valueText() }}" ng-hide="form.relationHide(rowsn, name)" ',
                            'ng-click="change(rowsn, name)" ',
                            'ng-class="{ \'wliuCommon-input-invalid\': form.getCol(name, rowsn).errorCode }" ',

                            'diag-target="#{{targetid}}" diag-toggle="click" ',
                            'popup-target="{{tooltip?\'#\'+tooltip:\'\'}}" popup-toggle="hover" popup-body="{{form.getCol(name, rowsn).errorCode?form.getCol(name, rowsn).errorMessage.nl2br():valueText()?valueText():form.colMeta(name).coldesc?form.colMeta(name).coldesc:form.colMeta(name).colname}}" ',
                            'title="{{tooltip?\'\':form.getCol(name, rowsn).errorCode?form.getCol(name, rowsn).errorMessage:valueText()?valueText():form.colMeta(name).coldesc?form.colMeta(name).coldesc:form.colMeta(name).colname}}" ',
                    '/>'
                ].join(''),
        controller: function ($scope) {
            $scope.form.lists[ $scope.form.colMeta($scope.name).list ].keys = $scope.form.lists[ $scope.form.colMeta($scope.name).list ].keys || {};
            $scope.change = function(rowsn, name) {
                $scope.form.lists[ $scope.form.colMeta($scope.name).list ].keys.rowsn = rowsn;
                $scope.form.lists[ $scope.form.colMeta($scope.name).list ].keys.name = name;
            }
            $scope.valueText = function() {
                var ret_text = "";
                for(var key1 in $scope.form.lists[$scope.form.colMeta($scope.name).list].list) {
                    var list2 = $scope.form.lists[$scope.form.colMeta($scope.name).list].list[key1].list;
                    for(var key2 in list2) {
                        var list3 = list2[key2].list;
                        var text = $.map( list3 , function(n) {
                            if( $scope.form.getCol($scope.name, $scope.rowsn)!= undefined ) {
                                if($scope.form.getCol($scope.name, $scope.rowsn).value[n.key]) 
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

wliu_form.directive("form.checkdiag3", function () {
    return {
        restrict: "E",
        replace: true,
        scope: {
            form:      "=",
            name:       "@",
            targetid:   "@",
            colnum:     "@",
            colnum1:    "@",
            bar:        "@",
            title:      "@"
        },
        template: [
                    '<div id="{{targetid}}" wliu-diag movable maskable class="container" scope="{{ form.scope }}" ',
                        //'ng-init="form.getCol( form.lists[name].keys.name, form.lists[name].keys.rowsn ).value=$.isPlainObject(form.getCol( form.lists[name].keys.name, form.lists[name].keys.rowsn ).value)?form.getCol( form.lists[name].keys.name, form.lists[name].keys.rowsn ).value:{}"',
                    '>',
                        '<div wliu-diag-head>{{ title }}</div>',
                        '<a class="wliu-btn24 wliu-btn24-selectlist" ng-show="bar==1">',
                            '<div class="wliu-selectlist">',
                                '<div class="wliu-selectlist-title info-color text-center">SELECTED</div>',
                                '<ul class="wliu-selectlist-content">',
                                    '<li ng-repeat="vObj in valueArr(form.lists[name].keys.rowsn, form.lists[name].keys.name)">',
                                    '{{ vObj.value }}',
                                    '</li>',
                                '</ul>',
                            '</div>',
                        '</a>',
                        '<input type="text" class="wliuCommon-search" ng-model="search" ng-model-options="{ updateOn:\'default blur\', debounce:{default: 500, blur:0} }" ng-show="bar==1" />',
                        '<a class="wliu-btn24 wliu-btn24-checkall" ng-click="checkall(form.lists[name].keys.rowsn, form.lists[name].keys.name)" title="check all" ng-show="bar==1"></a>',
                        '<a class="wliu-btn24 wliu-btn24-removeall" ng-click="removeall(form.lists[name].keys.rowsn, form.lists[name].keys.name)" title="remove all" ng-show="bar==1"></a>',
                        
                        '<select class="wliuCommon-filter" ',
                                'ng-model="listFilter.key" ',
                                'ng-options="sObj.key as sObj.value for sObj in form.lists[name].list" ',                        
                        ' ng-show="bar==1">',
                        '<option value=""></option>',
                        '</select>',
                        '<div class="wliu-underline" ng-show="bar==1"></div>',
                        '<div class="wliu-diag-body" style="font-size:14px;">',
                            '<span style="display:none;" ng-repeat-start="bbObj in form.lists[name].list|filter:getListFilter()"></span>',
                            '<span style="display:none;" ng-repeat-start="rdObj in bbObj.list|filter:search"></span>',
                                    '<div class="col-md-{{colnum}} col-sm-{{colnum}} col-xs-12" ng-if="rdObj.list && rdObj.list.length>0">',
                                        '<ul>',
                                            '<li title="{{rdObj.desc?rdObj.desc:rdObj.value}}">',
                                                '<span style="white-space:nowrap;font-weight:700;">{{ rdObj.value }}</span>',
                                                '<ul style="border-top:1px solid #cccccc;">',
                                                        '<span ng-repeat="tdObj in rdObj.list|filter:search">',
                                                            '<span class="checkbox">',
                                                                    '<input type="checkbox" scope="{{ form.scope }}" id="{{form.scope}}_{{name}}_{{tdObj.key}}" ',
                                                                        'ng-model="form.getCol( form.lists[name].keys.name, form.lists[name].keys.rowsn ).value[tdObj.key]" ng-value="tdObj.key"  ',
                                                                        'ng-change="form.changeCol(form.lists[name].keys.name, form.lists[name].keys.rowsn)" ',
                                                                        'ng-disabled="form.getCol( form.lists[name].keys.name, form.lists[name].keys.rowsn )==undefined" ',
                                                                    '/>',

                                                                    '<label for="{{form.scope}}_{{name}}_{{tdObj.key}}" title="{{tdObj.desc?tdObj.desc:tdObj.value}}">',
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
            $scope.form.lists[$scope.name].keys = $scope.form.lists[$scope.name].keys || {};
            $scope.listFilter = $scope.listFilter || {};
            $scope.change = function(rowsn, name) {
                // $scope.name is  lists[name],   name is colname
                $scope.form.lists[$scope.name].keys.rowsn = rowsn;
                $scope.form.lists[$scope.name].keys.name = name;
            }

            $scope.checkall = function(rowsn, name) {
                $scope.form.getCol( name, rowsn ).value = $scope.form.getCol( name, rowsn ).value || {};
                for( var key1 in $scope.form.lists[$scope.name].list  ) {
                    var list2 = $scope.form.lists[$scope.name].list[key1].list;
                    for( var key2 in list2) {
                        var list3 = list2[key2].list;
                        for(var key3 in list3) {
                            $scope.form.getCol( name, rowsn ).value[ list3[key3].key ] = true;
                        }
                     }
                }
                $scope.form.changeCol(name, rowsn);
            }

            $scope.removeall = function(rowsn, name) {
                for( var key in $scope.form.lists[$scope.name].list  ) {
                    $scope.form.getCol( name, rowsn ).value = {};
                }
                $scope.form.changeCol(name, rowsn);
            }

            $scope.getListFilter = function() {
                $scope.listFilter.key = $scope.listFilter.key?$scope.listFilter.key:""; 
                return $scope.listFilter;
            }

            $scope.valueArr = function(rowsn, name) {
                var ret_arr = [];
                for(var key1 in $scope.form.lists[$scope.name].list) {
                    var list2 = $scope.form.lists[$scope.name].list[key1].list;
                    for(var key2 in list2) {
                        var list3 = list2[key2].list;
                        var valueArr = $.map( list3 , function(n) {
                            if( $scope.form.getCol( name, rowsn )!= undefined  ) {
                                    if( $scope.form.getCol( name, rowsn ).value[n.key] ) 
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
                $(el).wliuDiag();
            });
        }
    }
});

wliu_form.directive("form.checklist3", function () {
    return {
        restrict: "E",
        replace: true,
        scope: {
            form:      "=",
            name:       "@",
            rowsn:      "@",
            colnum:     "@",
            colnum1:    "@",
            bar:        "@",
            title:      "@"
        },
        template: [
                    '<div class="col-md-12" style="border:1px dotted #666666;border-radius:5px;overflow-y:auto;" scope="{{ form.scope }}" ng-hide="form.relationHide(rowsn, name)" ',
                        //'ng-init="form.getCol( name, rowsn ).value=$.isPlainObject(form.getCol( name, rowsn ).value)?form.getCol( name, rowsn ).value:{}"',
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
                                'ng-options="sObj.key as sObj.value for sObj in form.lists[form.colMeta(name).list].list" ',                        
                        ' ng-show="bar==1">',
                        '<option value=""></option>',
                        '</select>',
                        '<div class="wliu-underline" ng-show="bar==1"></div>',
                        '<div class="wliu-diag-content" style="min-height:250px;min-width:350px;font-size:14px;">',
                            '<span style="display:none;" ng-repeat-start="bbObj in form.lists[form.colMeta(name).list].list|filter:getListFilter()"></span>',
                            '<span style="display:none;" ng-repeat-start="rdObj in bbObj.list|filter:search"></span>',
                                    '<div class="col-md-{{colnum}} col-sm-{{colnum}} col-xs-12" ng-if="rdObj.list && rdObj.list.length>0">',
                                        '<ul>',
                                            '<li title="{{rdObj.desc?rdObj.desc:rdObj.value}}">',
                                                '<span style="white-space:nowrap;font-weight:700;">{{ rdObj.value }}</span>',
                                                '<ul style="border-top:1px solid #cccccc;">',
                                                        '<span ng-repeat="tdObj in rdObj.list|filter:search">',
                                                            '<span class="checkbox">',
                                                                    '<input type="checkbox" scope="{{ form.scope }}" id="{{form.scope}}_{{name}}_{{rowsn}}_{{tdObj.key}}" ',
                                                                        'ng-model="form.getCol( name, rowsn ).value[tdObj.key]" ng-value="tdObj.key"  ',
                                                                        'ng-change="form.changeCol(name, rowsn)" ',
                                                                        'ng-disabled="form.getCol( name, rowsn )==undefined" ',
                                                                    '/>',

                                                                    '<label for="{{form.scope}}_{{name}}_{{rowsn}}_{{tdObj.key}}" title="{{tdObj.desc?tdObj.desc:tdObj.value}}">',
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
            $scope.form.lists[$scope.form.colMeta($scope.name).list].keys = $scope.form.lists[$scope.form.colMeta($scope.name).list].keys || {};
            $scope.listFilter = $scope.listFilter || {};

            $scope.checkall = function() {
                $scope.form.getCol($scope.name, $scope.rowsn).value = $scope.form.getCol($scope.name, $scope.rowsn).value || {};
                for( var key1 in $scope.form.lists[$scope.form.colMeta($scope.name).list].list ) {
                    var list2 = $scope.form.lists[$scope.form.colMeta($scope.name).list].list[key1].list;
                    for( var key2 in list2) {
                        var list3 = list2[key2].list;
                        for(var key3 in list3) {
                            $scope.form.getCol($scope.name, $scope.rowsn).value[ list3[key3].key ] = true;
                        }
                     }
                }
                $scope.form.changeCol($scope.name, $scope.rowsn);
            }

            $scope.removeall = function() {
                for( var key in $scope.form.lists[$scope.form.colMeta($scope.name).list].list  ) {
                    $scope.form.getCol($scope.name, $scope.rowsn).value = {};
                }
                $scope.form.changeCol($scope.name, $scope.rowsn);
            }

            $scope.getListFilter = function() {
                $scope.listFilter.key = $scope.listFilter.key?$scope.listFilter.key:""; 
                return $scope.listFilter;
            }

            $scope.valueArr = function() {
                var ret_arr = [];
                for(var key1 in $scope.form.lists[$scope.form.colMeta($scope.name).list].list) {
                    var list2 = $scope.form.lists[$scope.form.colMeta($scope.name).list].list[key1].list;
                    for(var key2 in list2) {
                        var list3 = list2[key2].list;
                        var valueArr = $.map( list3 , function(n) {
                            if( $scope.form.getCol($scope.name, $scope.rowsn)!= undefined  ) {
                                    if( $scope.form.getCol($scope.name, $scope.rowsn).value[n.key] ) 
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

wliu_form.directive("form.radio", function () {
    return {
        restrict: "E",
        replace: true,
        scope: {
            form:      "=",
            rowsn:      "@",
            colnum:     "@",
            name:       "@",
            tooltip:    "@"
        },
        template: [
                    '<div scope="{{ form.scope }}" ng-hide="form.relationHide(rowsn, name)" ',
                        'ng-class="{ \'wliuCommon-input-invalid\': form.getCol(name, rowsn).errorCode }" ',
                        'popup-target="{{tooltip?\'#\'+tooltip:\'\'}}" popup-toggle="hover" popup-body="{{form.getCol(name, rowsn).errorCode?form.getCol(name, rowsn).errorMessage.nl2br():form.colMeta(name).coldesc?form.colMeta(name).coldesc:form.colMeta(name).colname}}" ',
                        'title="{{tooltip?\'\':form.getCol(name, rowsn).errorCode?form.getCol(name, rowsn).errorMessage:form.colMeta(name).coldesc?form.colMeta(name).coldesc:form.colMeta(name).colname}}" ',
                    '>',
                        '<span ',
                            //'ng-init="form.getCol(name, rowsn).value=form.getCol(name, rowsn).value?form.getCol(name, rowsn).value:{};" ',                          
                            'ng-repeat="rdObj in form.lists[form.colMeta(name).list].list">',
                                '<span class="radio">',

                                        '<input type="radio"  scope="{{ form.scope }}" id="{{form.scope}}_{{name}}_{{rowsn}}_{{rdObj.key}}" ',
                                            'ng-model="form.getCol(name, rowsn).value" ng-value="rdObj.key"  ',
                                            'ng-change="form.changeCol(name, rowsn)" ',
                                            'ng-disabled="form.getCol(name, rowsn)==undefined" ',
                                        '/>',

                                        '<label scope="{{ form.scope }}" for="{{form.scope}}_{{name}}_{{rowsn}}_{{rdObj.key}}" title="{{rdObj.desc?rdObj.desc:rdObj.value}}">',
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

wliu_form.directive("form.radio1", function () {
    return {
        restrict: "E",
        replace: true,
        scope: {
            form:      "=",
            rowsn:      "@",
            name:       "@",
            targetid:   "@",
            tooltip:    "@"
        },
        template: [
                        '<input  type="text" readonly scope="{{ form.scope }}" class="wliuCommon-radiolist" value="{{ valueText() }}" ng-hide="form.relationHide(rowsn, name)" ',
                                'ng-click="change(rowsn, name)" ',
                                'ng-class="{ \'wliuCommon-input-invalid\': form.getCol(name, rowsn).errorCode }" ',

                                'diag-target="#{{targetid}}" diag-toggle="click" ',
                                'popup-target="{{tooltip?\'#\'+tooltip:\'\'}}" popup-toggle="hover" popup-body="{{form.getCol(name, rowsn).errorCode?form.getCol(name, rowsn).errorMessage.nl2br():valueText()?valueText():form.colMeta(name).coldesc?form.colMeta(name).coldesc:form.colMeta(name).colname}}" ',
                                'title="{{tooltip?\'\':form.getCol(name, rowsn).errorCode?form.getCol(name, rowsn).errorMessage:valueText()?valueText():form.colMeta(name).coldesc?form.colMeta(name).coldesc:form.colMeta(name).colname}}" ',
                        '/>',
                ].join(''),
        controller: function ($scope) {
            $scope.form.lists[ $scope.form.colMeta($scope.name).list ].keys = $scope.form.lists[ $scope.form.colMeta($scope.name).list ].keys || {};
            $scope.change = function(rowsn, name) {
                $scope.form.lists[ $scope.form.colMeta($scope.name).list ].keys.rowsn = rowsn;
                $scope.form.lists[ $scope.form.colMeta($scope.name).list ].keys.name = name;
            }
            $scope.valueText = function() {
                var val =  $scope.form.getCol( $scope.name, $scope.rowsn  )?$scope.form.getCol($scope.name, $scope.rowsn).value:"";
                var valueText = $scope.form.FCOLLECT.firstByKV( $scope.form.lists[$scope.form.colMeta($scope.name).list].list, {key:val} )?$scope.form.FCOLLECT.firstByKV( $scope.form.lists[$scope.form.colMeta($scope.name).list].list, {key:val} ).value:"";
                return valueText;
            }
        },
        link: function (sc, el, attr) {
        }
    }
});

wliu_form.directive("form.radiodiag1", function () {
    return {
        restrict: "E",
        replace: true,
        scope: {
            form:      "=",
            name:       "@",
            targetid:   "@",
            colnum:     "@",
            bar:        "@", 
            title:      "@"
        },
        template: [
                    '<div id="{{targetid}}" wliu-diag movable maskable scope="{{ form.scope }}">',
                        '<div wliu-diag-head>{{ title }}</div>',
                        '<a class="wliu-btn24 wliu-btn24-selectlist" ng-show="bar==1">',
                            '<div class="wliu-selectlist">',
                                '<div class="wliu-selectlist-title">Selected Items</div>',
                                '<ul class="wliu-selectlist-content">',
                                    '{{ valueText(form.lists[name].keys.rowsn, form.lists[name].keys.name) }}',
                                '</ul>',
                            '</div>',
                        '</a>',
                        '<input type="text" class="wliuCommon-search" ng-model="search" ng-model-options="{ updateOn:\'default blur\', debounce:{default: 500, blur:0} }" ng-show="bar==1" />',
                        '<div class="wliu-underline" ng-show="bar==1"></div>',
                        '<div class="wliu-diag-body" style="font-size:14px;">',
                        '<span ',
                            'ng-repeat="rdObj in form.lists[name].list|filter:search">',
                                '<span class="radio">',

                                        '<input type="radio" scope="{{ form.scope }}" name="{{form.scope}}_{{name}}_{{form.lists[name].keys.name}}" id="{{form.scope}}_{{name}}_{{form.lists[name].keys.name}}_{{rdObj.key}}" ',
                                            'ng-model="form.getCol( form.lists[name].keys.name, form.lists[name].keys.rowsn ).value" ng-value="rdObj.key"  ',
                                            'ng-change="form.changeCol(form.lists[name].keys.name, form.lists[name].keys.rowsn)" ',
                                            'ng-disabled="form.getCol( form.lists[name].keys.name, form.lists[name].keys.rowsn )==undefined" ',
                                        '/>',

                                        '<label for="{{form.scope}}_{{name}}_{{form.lists[name].keys.name}}_{{rdObj.key}}" title="{{rdObj.desc?rdObj.desc:rdObj.value}}">',
                                            '{{ rdObj.value }}',
                                        '</label>',

                                '</span>',
                                '<br ng-if="colnum>0?(($index+1)%colnum)==0:false" />',
                        '</span>',
                        '</div>',    
                    '</div>'
            
                ].join(''),
        controller: function ($scope) {
            $scope.form.lists[$scope.name].keys = $scope.form.lists[$scope.name].keys || {};

            $scope.valueText = function(rowsn, name) {
                var val =  $scope.form.getCol( name, rowsn )?$scope.form.getCol( name, rowsn ).value:"";
                var valueText = $scope.form.FCOLLECT.firstByKV( $scope.form.lists[$scope.name].list, {key:val} )?$scope.form.FCOLLECT.firstByKV( $scope.form.lists[$scope.name].list, {key:val} ).value:"";
                return valueText;
            }
            
        },
        link: function (sc, el, attr) {
            $(function(){
                $(el).wliuDiag();
            });
        }
    }
});

wliu_form.directive("form.radiolist1", function () {
    return {
        restrict: "E",
        replace: true,
        scope: {
            form:      "=",
            name:       "@",
            rowsn:      "@",
            colnum:     "@",
            bar:        "@", 
            title:      "@"
        },
        template: [
                    '<div class="col-md-12" style="border:1px dotted #666666;border-radius:5px; padding:2px; overflow-y:auto;text-align:left; min-width:240px;" scope="{{ form.scope }}" ng-hide="form.relationHide(rowsn, name)">',
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
                            'ng-repeat="rdObj in form.lists[form.colMeta(name).list].list|filter:search">',
                                '<span class="radio">',

                                        '<input type="radio" scope="{{ form.scope }}" name="{{form.scope}}_{{name}}_{{rowsn}}" id="{{form.scope}}_{{name}}_{{rowsn}}_{{rdObj.key}}" ',
                                            'ng-model="form.getCol( name, rowsn ).value" ng-value="rdObj.key"  ',
                                            'ng-change="form.changeCol(name,rowsn)" ',
                                            'ng-disabled="form.getCol( name, rowsn )==undefined" ',
                                        '/>',

                                        '<label for="{{form.scope}}_{{name}}_{{rowsn}}_{{rdObj.key}}" title="{{rdObj.desc?rdObj.desc:rdObj.value}}">',
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
                var val =  $scope.form.getCol( $scope.name, $scope.rowsn  )?$scope.form.getCol( $scope.name, $scope.rowsn  ).value:"";
                var valueText = $scope.form.FCOLLECT.firstByKV( $scope.form.lists[$scope.form.colMeta($scope.name).list].list, {key:val} )?$scope.form.FCOLLECT.firstByKV( $scope.form.lists[$scope.form.colMeta($scope.name).list].list, {key:val} ).value:"";
                return valueText;
            }
            
        },
        link: function (sc, el, attr) {
        }
    }
});

wliu_form.directive("form.radio2", function () {
    return {
        restrict: "E",
        replace: true,
        scope: {
            form:      "=",
            rowsn:      "@",
            name:       "@",
            targetid:   "@",
            tooltip:    "@"
        },
        template: [
                        '<input type="text" readonly scope="{{ form.scope }}" class="wliuCommon-radiolist" value="{{ valueText() }}" ng-hide="form.relationHide(rowsn, name)" ',
                                'ng-click="change(rowsn, name)" ',
                                'ng-class="{ \'wliuCommon-input-invalid\': form.getCol(name, rowsn).errorCode }" ',

                                'diag-target="#{{targetid}}" diag-toggle="click" ',
                                'popup-target="{{tooltip?\'#\'+tooltip:\'\'}}" popup-toggle="hover" popup-body="{{form.getCol(name, rowsn).errorCode?form.getCol(name, rowsn).errorMessage.nl2br():valueText()?valueText():form.colMeta(name).coldesc?form.colMeta(name).coldesc:form.colMeta(name).colname}}" ',
                                'title="{{tooltip?\'\':form.getCol(name, rowsn).errorCode?form.getCol(name, rowsn).errorMessage:valueText()?valueText():form.colMeta(name).coldesc?form.colMeta(name).coldesc:form.colMeta(name).colname}}" ',
                        '/>'
                ].join(''),
        controller: function ($scope) {
            $scope.form.lists[ $scope.form.colMeta($scope.name).list ].keys = $scope.form.lists[ $scope.form.colMeta($scope.name).list ].keys || {};
            $scope.change = function(rowsn, name) {
                $scope.form.lists[ $scope.form.colMeta($scope.name).list ].keys.rowsn = rowsn;
                $scope.form.lists[ $scope.form.colMeta($scope.name).list ].keys.name = name;
            }
            $scope.valueText = function() {
                var ret_text = "";
                for(var key in $scope.form.lists[$scope.form.colMeta($scope.name).list].list) {
                    var dList = $scope.form.lists[$scope.form.colMeta($scope.name).list].list[key].list;
                    var text = $.map( dList , function(n) {
                        if($scope.form.getCol($scope.name, $scope.rowsn)!=undefined) {
                            if($scope.form.getCol($scope.name, $scope.rowsn).value == n.key) 
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

wliu_form.directive("form.radiodiag2", function () {
    return {
        restrict: "E",
        replace: true,
        scope: {
            form:      "=",
            name:       "@",
            targetid:   "@",
            colnum:     "@",
            colnum1:    "@",
            bar:        "@",
            title:      "@"
        },
        template: [
                    '<div id="{{targetid}}" wliu-diag movable maskable class="container" scope="{{ form.scope }}">',
                        '<div wliu-diag-head>{{ title }}</div>',
                        '<a class="wliu-btn24 wliu-btn24-selectlist" ng-show="bar==1">',
                            '<div class="wliu-selectlist">',
                                '<div class="wliu-selectlist-title">Selected Items</div>',
                                '<ul class="wliu-selectlist-content">',
                                    '<li ng-repeat="vObj in valueArr(form.lists[name].keys.rowsn, form.lists[name].keys.name)">',
                                    '{{ vObj.value }}',
                                    '</li>',
                                '</ul>',
                            '</div>',
                        '</a>',
                        '<input type="text" class="wliuCommon-search" ng-model="search" ng-model-options="{ updateOn:\'default blur\', debounce:{default: 500, blur:0} }" ng-show="bar==1" />',
                        '<div class="wliu-underline" ng-show="bar==1"></div>',
                        '<div class="wliu-diag-body" style="font-size:14px;">',
                            '<span style="display:none;" ng-repeat-start="rdObj in form.lists[name].list|filter:search"></span>',
                                    '<div class="col-md-{{colnum}} col-sm-{{colnum}} col-xs-12" ng-if="rdObj.list && rdObj.list.length>0">',
                                        '<ul>',
                                            '<li title="{{rdObj.desc?rdObj.desc:rdObj.value}}">',
                                                '<b>{{ rdObj.value }}</b>',
                                                '<ul style="border-top:1px solid #cccccc;">',
                                                        '<span ng-repeat="tdObj in rdObj.list|filter:search">',
                                                            '<span class="radio">',
                                                                    '<input type="radio" scope="{{ form.scope }}" name="{{form.scope}}_{{name}}_{{form.lists[name].keys.name}}" id="{{form.scope}}_{{name}}_{{form.lists[name].keys.name}}_{{tdObj.key}}" ',
                                                                        'ng-model="form.getCol( form.lists[name].keys.name, form.lists[name].keys.rowsn ).value" ng-value="tdObj.key"  ',
                                                                        'ng-change="form.changeCol(form.lists[name].keys.name, form.lists[name].keys.rowsn)" ',
                                                                        'ng-disabled="form.getCol( form.lists[name].keys.name, form.lists[name].keys.rowsn )==undefined" ',
                                                                    '/>',

                                                                    '<label for="{{form.scope}}_{{name}}_{{form.lists[name].keys.name}}_{{tdObj.key}}" title="{{tdObj.desc?tdObj.desc:tdObj.value}}">',
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
            $scope.form.lists[$scope.name].keys = $scope.form.lists[$scope.name].keys || {};

            $scope.valueArr = function(rowsn, name) {
                var ret_arr = [];
                for(var key in $scope.form.lists[$scope.name].list) {
                    var dList = $scope.form.lists[$scope.name].list[key].list;
                    var valueArr = $.map( dList , function(n) {
                        if( $scope.form.getCol( name, rowsn )!= undefined  ) {
                                if( $scope.form.getCol( name, rowsn ).value == n.key ) 
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
                $(el).wliuDiag();
            });
        }
    }
});

wliu_form.directive("form.radiolist2", function () {
    return {
        restrict: "E",
        replace: true,
        scope: {
            form:      "=",
            name:       "@",
            rowsn:      "@",
            colnum:     "@",
            colnum1:    "@",
            bar:        "@",
            title:      "@"
        },
        template: [
                    '<div class="col-md-12" style="border:1px dotted #666666;border-radius:5px;overflow-y:auto;" scope="{{ form.scope }}" ng-hide="form.relationHide(rowsn, name)">',
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
                            '<span style="display:none;" ng-repeat-start="rdObj in form.lists[form.colMeta(name).list].list|filter:search"></span>',
                                    '<div class="col-md-{{colnum}} col-sm-{{colnum}} col-xs-12" ng-if="rdObj.list && rdObj.list.length>0">',
                                        '<ul>',
                                            '<li title="{{rdObj.desc?rdObj.desc:rdObj.value}}">',
                                                '<b>{{ rdObj.value }}</b>',
                                                '<ul style="border-top:1px solid #cccccc;">',
                                                        '<span ng-repeat="tdObj in rdObj.list|filter:search">',
                                                            '<span class="radio">',
                                                                    '<input type="radio" scope="{{ form.scope }}" name="{{form.scope}}_{{name}}_{{rowsn}}" id="{{form.scope}}_{{name}}_{{rowsn}}_{{tdObj.key}}" ',
                                                                        'ng-model="form.getCol( name, rowsn ).value" ng-value="tdObj.key"  ',
                                                                        'ng-change="form.changeCol(name, rowsn)" ',
                                                                        'ng-disabled="form.getCol( name, rowsn )==undefined" ',
                                                                    '/>',

                                                                    '<label for="{{form.scope}}_{{name}}_{{rowsn}}_{{tdObj.key}}" title="{{tdObj.desc?tdObj.desc:tdObj.value}}">',
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
                for(var key in $scope.form.lists[$scope.form.colMeta($scope.name).list].list) {
                    var dList = $scope.form.lists[$scope.form.colMeta($scope.name).list].list[key].list;
                    var valueArr = $.map( dList , function(n) {
                        if( $scope.form.getCol( $scope.name, $scope.rowsn  )!= undefined  ) {
                                if( $scope.form.getCol( $scope.name, $scope.rowsn  ).value == n.key ) 
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

wliu_form.directive("form.radio3", function () {
    return {
        restrict: "E",
        replace: true,
        scope: {
            form:      "=",
            rowsn:      "@",
            name:       "@",
            targetid:   "@",
            tooltip:    "@"
        },
        template: [
                    '<input type="text" readonly scope="{{ form.scope }}" class="wliuCommon-radiolist" value="{{ valueText() }}" ng-hide="form.relationHide(rowsn, name)" ',
                            'ng-click="change(rowsn, name)" ',
                            'ng-class="{ \'wliuCommon-input-invalid\': form.getCol(name, rowsn).errorCode }" ',

                            'diag-target="#{{targetid}}" diag-toggle="click" ',
                            'popup-target="{{tooltip?\'#\'+tooltip:\'\'}}" popup-toggle="hover" popup-body="{{form.getCol(name, rowsn).errorCode?form.getCol(name, rowsn).errorMessage.nl2br():valueText()?valueText():form.colMeta(name).coldesc?form.colMeta(name).coldesc:form.colMeta(name).colname}}" ',
                            'title="{{tooltip?\'\':form.getCol(name, rowsn).errorCode?form.getCol(name, rowsn).errorMessage:valueText()?valueText():form.colMeta(name).coldesc?form.colMeta(name).coldesc:form.colMeta(name).colname}}" ',
                    '/>'
                ].join(''),
        controller: function ($scope) {
            $scope.form.lists[ $scope.form.colMeta($scope.name).list ].keys = $scope.form.lists[ $scope.form.colMeta($scope.name).list ].keys || {};
            $scope.change = function(rowsn, name) {
                $scope.form.lists[ $scope.form.colMeta($scope.name).list ].keys.rowsn = rowsn;
                $scope.form.lists[ $scope.form.colMeta($scope.name).list ].keys.name = name;
            }
            $scope.valueText = function() {
                var ret_text = "";
                for(var key in $scope.form.lists[$scope.form.colMeta($scope.name).list].list) {
                    var dList = $scope.form.lists[$scope.form.colMeta($scope.name).list].list[key].list;
                    for(var pkey in dList) {
                        var pList = dList[pkey].list;
                        var text = $.map( pList , function(n) {
                            if( $scope.form.getCol($scope.name, $scope.rowsn)!=undefined ) {
                                if($scope.form.getCol($scope.name, $scope.rowsn).value==n.key) 
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

wliu_form.directive("form.radiodiag3", function () {
    return {
        restrict: "E",
        replace: true,
        scope: {
            form:      "=",
            name:       "@",
            targetid:   "@",
            colnum:     "@",
            colnum1:    "@",
            bar:        "@",
            title:      "@"
        },
        template: [
                    '<div id="{{targetid}}" wliu-diag movable maskable class="container" scope="{{ form.scope }}">',
                        '<div wliu-diag-head>{{ title }}</div>',
                        '<a class="wliu-btn24 wliu-btn24-selectlist" ng-show="bar==1">',
                            '<div class="wliu-selectlist">',
                                '<div class="wliu-selectlist-title">Selected Items</div>',
                                '<ul class="wliu-selectlist-content">',
                                    '<li ng-repeat="vObj in valueArr(form.lists[name].keys.rowsn, form.lists[name].keys.name)">',
                                    '{{ vObj.value }}',
                                    '</li>',
                                '</ul>',
                            '</div>',
                        '</a>',
                        '<input type="text" class="wliuCommon-search" ng-model="search" ng-model-options="{ updateOn:\'default blur\', debounce:{default: 500, blur:0} }" ng-show="bar==1" />',
                        '<select class="wliuCommon-filter" ',
                                'ng-model="listFilter.key" ',
                                'ng-options="sObj.key as sObj.value for sObj in form.lists[name].list" ',                        
                        ' ng-show="bar==1">',
                        '<option value=""></option>',
                        '</select>',
                        '<div class="wliu-underline" ng-show="bar==1"></div>',
                        '<div class="wliu-diag-body" style="font-size:14px;">',
                            '<span style="display:none;" ng-repeat-start="bbObj in form.lists[name].list|filter:getListFilter()"></span>',
                            '<span style="display:none;" ng-repeat-start="rdObj in bbObj.list|filter:search"></span>',
                                    '<div class="col-md-{{colnum}} col-sm-{{colnum}} col-xs-12" ng-if="rdObj.list && rdObj.list.length>0">',
                                        '<ul>',
                                            '<li title="{{rdObj.desc?rdObj.desc:rdObj.value}}">',
                                                '<b>{{ rdObj.value }}</b>',
                                                '<ul style="border-top:1px solid #cccccc;">',
                                                        '<span ng-repeat="tdObj in rdObj.list|filter:search">',
                                                            '<span class="radio">',
                                                                    '<input type="radio" scope="{{ form.scope }}" name="{{form.scope}}_{{name}}_{{form.lists[name].keys.name}}" id="{{form.scope}}_{{name}}_{{form.lists[name].keys.name}}_{{tdObj.key}}" ',
                                                                        'ng-model="form.getCol( form.lists[name].keys.name, form.lists[name].keys.rowsn ).value" ng-value="tdObj.key"  ',
                                                                        'ng-change="form.changeCol(form.lists[name].keys.name, form.lists[name].keys.rowsn)" ',
                                                                        'ng-disabled="form.getCol( form.lists[name].keys.name, form.lists[name].keys.rowsn )==undefined" ',
                                                                    '/>',

                                                                    '<label for="{{form.scope}}_{{name}}_{{form.lists[name].keys.name}}_{{tdObj.key}}" title="{{tdObj.desc?tdObj.desc:tdObj.value}}">',
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
                for(var key in $scope.form.lists[$scope.name].list) {
                    var dList = $scope.form.lists[$scope.name].list[key].list;
                    var valueArr = $.map( dList , function(n) {
                        if( $scope.form.getCol( name, rowsn )!= undefined  ) {
                                if( $scope.form.getCol( name, rowsn ).value == n.key ) 
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
                $(el).wliuDiag();
            });
        }
    }
});

wliu_form.directive("form.radiolist3", function () {
    return {
        restrict: "E",
        replace: true,
        scope: {
            form:      "=",
            name:       "@",
            rowsn:      "@",
            colnum:     "@",
            colnum1:    "@",
            bar:        "@",
            title:      "@"
        },
        template: [
                    '<div class="col-md-12" style="border:1px dotted #666666;border-radius:5px;overflow-y:auto;" scope="{{ form.scope }}" ng-hide="form.relationHide(rowsn, name)">',
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
                                'ng-options="sObj.key as sObj.value for sObj in form.lists[form.colMeta(name).list].list" ',                        
                        ' ng-show="bar==1">',
                        '<option value=""></option>',
                        '</select>',
                        '<div class="wliu-underline" ng-show="bar==1"></div>',
                        '<div class="wliu-diag-content" style="font-size:14px;">',
                            '<span style="display:none;" ng-repeat-start="bbObj in form.lists[form.colMeta(name).list].list|filter:getListFilter()"></span>',
                            '<span style="display:none;" ng-repeat-start="rdObj in bbObj.list|filter:search"></span>',
                                    '<div class="col-md-{{colnum}} col-sm-{{colnum}} col-xs-12" ng-if="rdObj.list && rdObj.list.length>0">',
                                        '<ul>',
                                            '<li title="{{rdObj.desc?rdObj.desc:rdObj.value}}">',
                                                '<b>{{ rdObj.value }}</b>',
                                                '<ul style="border-top:1px solid #cccccc;">',
                                                        '<span ng-repeat="tdObj in rdObj.list|filter:search">',
                                                            '<span class="radio">',
                                                                    '<input type="radio" scope="{{ form.scope }}" name="{{form.scope}}_{{name}}_{{rowsn}}" id="{{form.scope}}_{{name}}_{{rowsn}}_{{tdObj.key}}" ',
                                                                        'ng-model="form.getCol( name, rowsn ).value" ng-value="tdObj.key"  ',
                                                                        'ng-change="form.changeCol(name, rowsn)" ',
                                                                        'ng-disabled="form.getCol( name, rowsn )==undefined" ',
                                                                    '/>',

                                                                    '<label for="{{form.scope}}_{{name}}_{{rowsn}}_{{tdObj.key}}" title="{{tdObj.desc?tdObj.desc:tdObj.value}}">',
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
            $scope.form.lists[$scope.form.colMeta($scope.name).list].keys = $scope.form.lists[$scope.form.colMeta($scope.name).list].keys || {};
            $scope.listFilter = $scope.listFilter || {};

            $scope.getListFilter = function() {
                $scope.listFilter.key = $scope.listFilter.key?$scope.listFilter.key:""; 
                return $scope.listFilter;
            }

            $scope.valueArr = function() {
                var ret_arr = [];
                for(var key in $scope.form.lists[$scope.form.colMeta($scope.name).list].list) {
                    var dList = $scope.form.lists[$scope.form.colMeta($scope.name).list].list[key].list;
                    var valueArr = $.map( dList , function(n) {
                        if( $scope.form.getCol( $scope.name, $scope.rowsn  )!= undefined  ) {
                                if( $scope.form.getCol( $scope.name, $scope.rowsn  ).value == n.key ) 
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

wliu_form.directive("form.button", function (wliuFormService) {
    return {
        restrict: "E",
        replace: true,
        scope: {
            form:      "=",
            rowsn:      "@",
            name:       "@",
            tooltip:    "@",
            actname:    "@",
            action:     "&",
            outline:    "@",
            icon:       "@",
            before:     "&",
            after:      "&"
        },
        template: [
                    '<span>',
                        '<button class="btn btn{{ outline==1?\'-outline\':\'\'}}-{{ buttonStyle() }} waves-effect" scope="{{ form.scope }}" ',
                            //'ng-class="{\'grey\': !buttonState(name, form.getRow(rowsn).rowstate) }" ',
                            'style="min-width:60px;{{!buttonState(name, form.getRow(rowsn).rowstate)?\'border-color:grey;\':\'\'}}" ',
                            'title="{{form.colMeta(name).coldesc?form.colMeta(name).coldesc:form.colMeta(name).colname}}"',
                            'ng-disabled="!buttonState(name, form.getRow(rowsn).rowstate)" ',
                            'ng-click="action1(form.getRow(rowsn))" ',

                            'popup-target="{{tooltip?\'#\'+tooltip:\'\'}}" popup-toggle="hover" ',
                            'popup-body="{{form.getRow(rowsn).error.errorCode?form.getRow(rowsn).error.errorMessage.nl2br():\'\'}}"',
                            'title="{{ tooltip?\'\':(form.getRow(rowsn).error.errorCode? form.getRow(rowsn).error.errorMessage : \'\') }}"',
                        '>',
                        '<span style="vertical-align:middle;{{!buttonState(name, form.getRow(rowsn).rowstate)?\'color:#666666;\':\'\'}}">',
                            '{{actname}}',
                        '</span>',
                        '</button>',
                    '</span>'
                ].join(''),
        controller: function ($scope, wliuFormService) {
            $scope.buttonStyle = function() {
                var ret_val = "primary";
                switch( $scope.name ) {
                    case "add":
                        ret_val = "default";
                        break;
                    case "save":
                        ret_val = "secondary";
                        break;
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
                    case "add":
                        $scope.form.addRecord();
                        break;
                    case "save":
                        $scope.form.saveRecord(theRow);
                        break;
                    case "cancel":
                        switch(theRow.rowstate) {
                            case 0:
                                break;
                            case 1:
                                $scope.form.cancelRow(theRow);
                                break;
                            case 2:
                                $scope.form.resetRow(theRow);
                                break;
                            case 3:
                                $scope.form.cancelRow(theRow);
                                break;
                        } 
    
                        // ckeditor  reset value to old value;  due to single way sync 
                        for(var cidx in $scope.form.cols) {
                            if( $scope.form.cols[cidx].coltype.toLowerCase() == "ckeditor" )
                               if(CKEDITOR.instances[$scope.form.scope + "_" + $scope.form.cols[cidx].name]) {
                                    CKEDITOR.instances[$scope.form.scope + "_" + $scope.form.cols[cidx].name].setData( $scope.form.getCol($scope.form.cols[cidx].name, $scope.rowsn).value?$scope.form.getCol($scope.form.cols[cidx].name, $scope.rowsn).value:"" );
                                }
                        }
                        break;
                    case "delete":
                        $scope.form.deleteRow(theRow); 
                        break;
                }                
                //
                $scope.action();
                $scope.after();
            };

            $scope.buttonState = function(name, rowstate) {
                var right = $scope.form.rights?(parseInt($scope.form.rights[name])?true:false):false;
                if( name=="add") {
                    rowstate = rowstate?rowstate:0;
                    if(rowstate<1) return true;
                } 
                return  wliuFormService.buttonState(name,rowstate) && right;
            };
        },
        link: function (sc, el, attr) {
        }
    }
});


wliu_form.directive("form.linkbutton", function (wliuFormService) {
    return {
        restrict: "E",
        replace: true,
        scope: {
            form:      "=",
            rowsn:      "@",
            name:       "@",
            tooltip:    "@",
            actname:    "@",
            action:     "&",
            icon:       "@",
            before:     "&",
            after:      "&"
        },
        template: [
                    '<span>',
                    '<a href="javascript:void(0)" scope="{{ form.scope }}" ',
                        'class="btn btn-{{ buttonStyle() }} waves-effect {{!buttonState(name, form.getRow(rowsn).rowstate)?\'grey\':\'\'}} {{!buttonState(name, form.getRow(rowsn).rowstate)?\'disabled\':\'\'}}" ',
                        'style="min-width:60px;" ',
                        'ng-click="action1(form.getRow(rowsn))" ',
                        'popup-target="{{tooltip?\'#\'+tooltip:\'\'}}" popup-toggle="hover" ',
                        'popup-body="{{form.getRow(rowsn).error.errorCode?form.getRow(rowsn).error.errorMessage.nl2br():\'\'}}"',
                        'title="{{ tooltip?\'\':(form.getRow(rowsn).error.errorCode? form.getRow(rowsn).error.errorMessage : \'\') }}"',
                    '>',
                    '{{actname?actname:name.capital()}}',
                    '</a>',
                    '</span>'
                ].join(''),
        controller: function ($scope) {
            $scope.buttonStyle = function() {
                var ret_val = "primary";
                switch( $scope.name ) {
                    case "add":
                        ret_val = "default";
                        break;
                    case "save":
                        ret_val = "secondary";
                        break;
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
                    case "add":
                        $scope.form.addRecord();
                        break;
                    case "save":
                        $scope.form.saveRecord(theRow);
                        break;
                    case "cancel":
                        switch(theRow.rowstate) {
                            case 0:
                                break;
                            case 1:
                                $scope.form.cancelRow(theRow);
                                break;
                            case 2:
                                $scope.form.resetRow(theRow);
                                break;
                            case 3:
                                $scope.form.cancelRow(theRow);
                                break;
                        } 
    
                        // ckeditor  reset value to old value;  due to single way sync 
                        for(var cidx in $scope.form.cols) {
                            if( $scope.form.cols[cidx].coltype.toLowerCase() == "ckeditor" )
                               if(CKEDITOR.instances[$scope.form.scope + "_" + $scope.form.cols[cidx].name]) {
                                    CKEDITOR.instances[$scope.form.scope + "_" + $scope.form.cols[cidx].name].setData( $scope.form.getCol($scope.form.cols[cidx].name, $scope.rowsn).value?$scope.form.getCol($scope.form.cols[cidx].name, $scope.rowsn).value:"" );
                                }
                        }
                        break;
                    case "delete":
                        $scope.form.deleteRow(theRow); 
                        break;
                }                
                //
                $scope.action();
                $scope.after();
            };

            $scope.buttonState = function(name, rowstate) {
                var right = $scope.form.rights?(parseInt($scope.form.rights[name])?true:false):false;
                if( name=="add") {
                    rowstate = rowstate?rowstate:0;
                    if(rowstate<1) return true;
                } 
                return  wliuFormService.buttonState(name,rowstate) && right;
            };
       },
        link: function (sc, el, attr) {
        }
    }
});


wliu_form.directive("form.rowerror", function (wliuFormService) {
    return {
        restrict: "E",
        replace: true,
        scope: {
            form:      "=",
            targetid:   "@",
            rowsn:      "@"
        },
        template: [
                    '<div id="{{targetid}}" wliu-diag movable maskable>',
                        '<div wliu-diag-head>Message</div>',
                        '<div wliu-diag-body style="font-size:16px;">',
                        '<i class="fa fa-exclamation-triangle fa-lg" aria-hidden="true" style="color:red;"></i> <span style="font-size:16px;">We can\'t process submitted data:</span>',
                        '<div style="margin-top:12px;" ng-bind-html="getHTML()"></div>',
                        '</div>',    
                    '</div>'
                ].join(''),
        controller: function ($scope, $sce) {
            $scope.getHTML = function() {
                if( $scope.form.getRow($scope.rowsn) )
                    if( $scope.form.getRow($scope.rowsn).error.errorCode )
                        return $sce.trustAsHtml($scope.form.getRow($scope.rowsn).error.errorMessage.nl2br());
                    else 
                        return $sce.trustAsHtml("");
            }
        },
        link: function (sc, el, attr) {
            $(function(){
                $(el).wliuDiag();
                $(el).unbind("errorshow").bind("errorshow", function(evt){
                    if( sc.form.getRow(sc.rowsn) ) {
                        if( parseInt(sc.form.getRow(sc.rowsn).error.errorCode) ) {
                            $(el).trigger("show");
                        }
                    }
                });
            });
        }
    }
});

wliu_form.directive("form.taberror", function (wliuFormService) {
    return {
        restrict: "E",
        replace: true,
        scope: {
            form:      "=",
            targetid:   "@"
        },
        template: [
                    '<div id="{{targetid}}" wliu-diag movable maskable>',
                        '<div wliu-diag-head>Message</div>',
                        '<div wliu-diag-body style="font-size:16px;">',
                        '<i class="fa fa-exclamation-triangle fa-lg" aria-hidden="true" style="color:red;"></i> <span style="font-size:16px;">We can\'t process submitted data:</span>',
                        '<div style="margin-top:12px;" ng-bind-html="getHTML()"></div>',
                        '</div>',    
                    '</div>'
                ].join(''),
        controller: function ($scope, $sce) {
            $scope.getHTML = function() {
                if( $scope.form.error.errorCode )
                    return $sce.trustAsHtml($scope.form.error.errorMessage.nl2br());
                else 
                    return $sce.trustAsHtml("");
            }
        },
        link: function (sc, el, attr) {
            $(function(){
                $(el).wliuDiag();
                $(el).unbind("errorshow").bind("errorshow", function(evt){
                    if( parseInt(sc.form.error.errorCode) ) {
                        $(el).trigger("show");
                    }
                });
            });
        }
    }
});


/****** Form Service *********/
wliu_form.service("wliuFormService", function () {
    var self = this;
    // state control button status
    self.btnActive = {
        "0": { "detail": 1, "save": 0, "cancel": 0, "reset":0, "add": 1, "delete": 1, "output": 1, "print": 1, "email": 1 },
        "1": { "detail": 1, "save": 1, "cancel": 1, "reset":1, "add": 0, "delete": 0, "output": 0, "print": 0, "email": 0 },
        "2": { "detail": 1, "save": 1, "cancel": 1, "reset":1, "add": 0, "delete": 0, "output": 0, "print": 0, "email": 0 },
        "3": { "detail": 1, "save": 1, "cancel": 1, "reset":0, "add": 0, "delete": 0, "output": 0, "print": 0, "email": 0 }
    };

    self.buttonState = function(name, rowstate ) {
        return self.btnActive[rowstate]?(self.btnActive[rowstate][name]?true:false):false;
    }
});