//save & publish
javascript: (function () { var form = $("iframe").filter(function () { return $(this).css("visibility") == "visible" })[0].contentWindow; form.SaveForm(false); form.SaveAndPublish();})();

//publish all
javascript: (function () { $("iframe").filter(function () { return $(this).css("visibility") == "visible" })[0].contentWindow.Mscrm.FormEditor.PublishAll();})();

//get service infos
javascript: (function () { var form = $("iframe").filter(function () { return $(this).css("visibility") == "visible" })[0].contentWindow; var orgUrl = form.Xrm.Page.context.getClientUrl(); var users; $.ajax({ type: "GET", contentType: "application/json; charset=utf-8", datatype: "json", url: Xrm.Page.context.getClientUrl() + "/XRMServices/2011/OrganizationData.svc/SystemUserSet?$filter=AccessMode/Value eq 0 and IsDisabled eq false", beforeSend: function (XMLHttpRequest) { XMLHttpRequest.setRequestHeader("Accept", "application/json"); }, async: false, success: function (data, textStatus, xhr) { var results = data.d.results; window.prompt('Copy to clipboard: Ctrl+C, Enter', "Unique Name: " + form.Xrm.Page.context.getOrgUniqueName() + ", URL: " + orgUrl + ", " + results.length + " active user"); }, error: function (xhr, textStatus, errorThrown) { alert(textStatus + " " + errorThrown); } }); })();

//show properties dialog
javascript: (function () { var form = $("iframe").filter(function () { return ($(this).css("visibility") == "visible") })[0].contentWindow; var id = form.Xrm.Page.data.entity.getId(); var etc = form.Xrm.Page.context.getQueryStringParameters().etc; form.Mscrm.RibbonActions.openFormProperties(id, etc); })();

//get field value      
javascript: (function () { var form = $("iframe").filter(function () { return $(this).css("visibility") == "visible" })[0].contentWindow; var v, f = prompt("Enter field name"); var a = form.Xrm.Page.getAttribute(f); switch (a.getAttributeType()) { case "optionset": case "boolean": v = a.getSelectedOption().text; break; case "lookup": v = a.getValue()[0].name; break; default: v = a.getValue(); break; } window.prompt('Copy to clipboard: Ctrl+C, Enter', v); })();

//get entity typecode
javascript: (function () { var form = $("iframe").filter(function () { return $(this).css("visibility") == "visible" })[0].contentWindow; var name = form.Xrm.Page.data.entity.getEntityName(); var typeCode = form.Xrm.Page.context.getQueryStringParameters().etc; if (typeCode) { window.prompt('Copy to clipboard: Ctrl+C, Enter', typeCode.toString() + " = " + name) } })();

//get dirty fields
javascript: (function () { var form = $("iframe").filter(function () { return $(this).css("visibility") == "visible" })[0].contentWindow; var message = "The following fields are dirty: \n"; form.Xrm.Page.data.entity.attributes.forEach(function (attribute, index) { if (attribute.getIsDirty() == true) { message += "\u2219 " + attribute.getName() + "\n"; } }); alert(message); })();

//get data Xml
javascript: (function () { var form = $("iframe").filter(function () { return ($(this).css('visibility') == 'visible') })[0].contentWindow; window.prompt("Copy to clipboard: Ctrl+C, Enter", form.Xrm.Page.data.entity.getDataXml)() })();

//create new record
javascript: (function () { var form = $("iframe").filter(function () { return ($(this).css('visibility') == 'visible') })[0].contentWindow; try { var name = form.Xrm.Page.data.entity.getEntityName(); } catch (e) { } var y = prompt('Type the schema name of the entity to create:', name ? name : 'account'); if (y) { window.open(form.Xrm.Page.context.getClientUrl() + "/main.aspx?etn=" + y + "&pagetype=entityrecord"); } })();

//activate record
javascript: (function () { var form = $("iframe").filter(function () { return ($(this).css('visibility') == 'visible') })[0].contentWindow; form.Mscrm.CommandBarActions.activate(form.Xrm.Page.data.entity.getId(), form.Xrm.Page.data.entity.getEntityName()); })();

//get url
javascript: (function () { var url = document.getElementById('crmContentPanel').getAttribute('src'); if (url.indexOf('/read/page.aspx') == -1) { if (url.indexOf(Xrm.Page.context.getOrgUniqueName()) != -1) { window.prompt('Copy to clipboard: Ctrl+C, Enter', Xrm.Page.context.getClientUrl() + url.replace('/' + Xrm.Page.context.getOrgUniqueName(), '')); } else { window.prompt('Copy to clipboard: Ctrl+C, Enter', Xrm.Page.context.getClientUrl() + url); } } else { window.prompt('Copy to clipboard: Ctrl+C, Enter', window.location.href); } })();

//get record id
javascript: (function () { var form = $("iframe").filter(function () { return $(this).css("visibility") == "visible" })[0].contentWindow; window.prompt("Copy to clipboard: Ctrl+C, Enter", form.Xrm.Page.data.entity.getId().slice(1, -1)) })();

//save
javascript: (function () { javascript: $("iframe").filter(function () { return ($(this).css('visibility') == 'visible') })[0].contentWindow.Xrm.Page.data.entity.save(); })();

//save and new
javascript: (function () { javascript: $("iframe").filter(function () { return ($(this).css('visibility') == 'visible') })[0].contentWindow.Xrm.Page.data.entity.save('saveandnew'); })();

//save and new
javascript: (function () { javascript: $("iframe").filter(function () { return ($(this).css('visibility') == 'visible') })[0].contentWindow.Xrm.Page.data.entity.save('saveandclose'); })();

//refresh form
javascript: (function () { $("iframe").filter(function () { return ($(this).css('visibility') == 'visible') })[0].contentWindow.Xrm.Page.data.refresh() })();

//refresh & save form
javascript: (function () { $("iframe").filter(function () { return ($(this).css('visibility') == 'visible') })[0].contentWindow.Xrm.Page.data.refresh(true) })();

//open record from lookup
javascript: (function () { var form = $("iframe").filter(function () { return $(this).css("visibility") == "visible" })[0].contentWindow; var elem = form.document.activeElement; var id = elem.getAttribute("id"); var guid = null; var type = null; if (elem.getAttribute("isInlineLookup") == "true") { guid = elem.getAttribute("oid"); type = elem.getAttribute("otypename") } else if (id != null) { var pos = id.lastIndexOf("_"); if (pos > -1) { var suffix = id.substring(pos + 1); if (["ledit", "lookupDiv", "i"].indexOf(suffix) > -1) { id = id.substring(0, pos) } id = id.replace("_i_ledit_multi", "").replace("_ledit_multi", "") } var control = form.Xrm.Page.getControl(id); if (control != null) { var field = control.getAttribute(); if (field != null) { var value = field.getValue(); if (value != null) { var record = value[value.length - 1]; guid = record.id; type = record.entityType } } } } if (guid != null && guid != "" && type != null && type != "") { var url = form.Xrm.Page.context.getClientUrl() + "/main.aspx?etn=" + type + "&id=" + guid + "&pagetype=entityrecord"; window.open(url) } else { alert("Unable to open record. Make sure you're clicked into a lookup field with a value.") } void (0); })();

//open advanced find
javascript: (function () { var form = $("iframe").filter(function () { return $(this).css("visibility") == "visible" })[0].contentWindow; window.open(form.Xrm.Page.context.getClientUrl() + "/main.aspx?pagetype=advancedfind"); })();

//open solution list
javascript: (function () { var form = $("iframe").filter(function () { return $(this).css("visibility") == "visible" })[0].contentWindow; window.open(form.Xrm.Page.context.getClientUrl() + "/tools/Solution/home_solution.aspx?etc=7100&sitemappath=Settings%7cCustomizations%7cnav_solution"); })();

//open diagnostic page
javascript: (function () { var form = $("iframe").filter(function () { return $(this).css("visibility") == "visible" })[0].contentWindow; window.open(form.Xrm.Page.context.getClientUrl() + "/tools/diagnostics/diag.aspx"); })();

//show schema name
javascript: (function () { var form = $("iframe").filter(function () { return $(this).css("visibility") == "visible" })[0].contentWindow; form.Xrm.Page.ui.controls.forEach(function (a) { a.setLabel(a.getName()) }); })();

//get all optionsets
javascript: (function () { var osa = ""; var form = $("iframe").filter(function () { return $(this).css("visibility") == "visible" })[0].contentWindow; form.Xrm.Page.ui.controls.forEach(function (c, i) { if (c.getControlType() == "optionset") { var osv = "<br /><b><u>Name: " + c.getName() + "</u></b><br />"; frames[0].$("#" + c.getName() + "_i").find("option").first().nextAll().each(function () { osv += "<div><i>Value:</i> " + $(this).attr("value") + " - <i>Text:</i> " + $(this).attr("title") + "</div>"; }); osa += "<div>" + osv + "</div>"; } }); (window.open("#", "#").document.open()).write("<div style='font-family:Segoe UI,Arial;font-size:11px;overflow:always'>" + osa + "</div>") })();

//get hidden fiel
javascript: (function () { var form = $("iframe").filter(function () { return $(this).css("visibility") == "visible" })[0].contentWindow, h = "", j = 0; form.Xrm.Page.ui.controls.forEach(function (c) { if (!c.getVisible()) { j++; h += c.getName() + ", "; } }); window.prompt(j + ' hidden fields on this form', h); })();

//get formtype
javascript: (function () { var form = $("iframe").filter(function () { return $(this).css("visibility") == "visible" })[0].contentWindow; var ft = ["1 = CREATE", "2 = UPDATE", "3 = READ_ONLY", "4 = DISABLED", "5 = QUICK_CREATE", "6 = BULK_EDIT"]; window.prompt('Copy to clipboard: Ctrl+C, Enter', ft[(form.Xrm.Page.ui.getFormType()) - 1]); })();

//get document.readystate
javascript: (function () { alert(document.readyState) })();

//godmode
javascript: (function () { var form = $("iframe").filter(function () { return $(this).css("visibility") == "visible" })[0].contentWindow; var attrs = form.Xrm.Page.data.entity.attributes.get(); for (var i in attrs) { attrs[i].setRequiredLevel("none") } var contrs = form.Xrm.Page.ui.controls.get(); for (var i in contrs) { try { contrs[i].setVisible(true); contrs[i].setDisabled(false); contrs[i].clearNotification() } catch (e) { } } var tabs = form.Xrm.Page.ui.tabs.get(); for (var i in tabs) { tabs[i].setVisible(true); tabs[i].setDisplayState("expanded"); var sects = tabs[i].sections.get(); for (var i in sects) { sects[i].setVisible(true) } } })();

//enable all fields
javascript: (function () { var form = $("iframe").filter(function () { return $(this).css("visibility") == "visible" })[0].contentWindow; var contrs = form.Xrm.Page.ui.controls.get(); for (var i in contrs) { try { contrs[i].setVisible(true); contrs[i].setDisabled(false); contrs[i].clearNotification(); } catch (e) { } } })();

//open entity editor
javascript: (function () { var form = $("iframe").filter(function () { return ($(this).css('visibility') == 'visible') })[0].contentWindow; try { var etc = form.Xrm.Page.context.getQueryStringParameters().etc; } catch (e) { } form.Mscrm.RibbonActions.openEntityEditor(etc); })();

//open RecordWall
javascript: (function () { var form = $("iframe").filter(function () { return $(this).css("visibility") == "visible" })[0].contentWindow; form.Xrm.Utility.openWebResource("msdyn_/RecordWall.htm"); })();

//open PersonalWall
javascript: (function () { var form = $("iframe").filter(function () { return $(this).css("visibility") == "visible" })[0].contentWindow; form.Xrm.Utility.openWebResource("msdyn_/PersonalWall.htm"); })();
