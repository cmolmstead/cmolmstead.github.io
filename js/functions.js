$(document).ready(function(){jQuery('.gallery_image a img').load(function(){jQuery(this).fadeIn(500);});$(".sub_nav").hide();$("a h3").click(function(){if($(this).is(".active")){$(this).toggleClass("active");$(this).parent().next(".sub_nav").slideToggle();return false;}else{$(".sub_nav:visible").slideUp("slow");$(".sub_nav2:visible").slideUp("slow");$("h3.active").removeClass("active");$("h4.active").removeClass("active");$(this).toggleClass("active");$(this).parent().next(".sub_nav").slideToggle();return false;}});});$(document).ready(function(){$(".sub_nav2").hide();$("a h4").click(function(){if($(this).is(".active")){$(this).toggleClass("active");$(this).parent().next(".sub_nav2").slideToggle();return false;}else{$(".sub_nav2:visible").slideUp("slow");$("h4.active").removeClass("active");$(this).toggleClass("active");$(this).parent().next(".sub_nav2").slideToggle();return false;}});});document.write('<style type="text/css">'
+'.hidepiece{display:none}\n'
+'@media print{.hidepiece{display:block !important;}}\n'
+'</style>')
function virtualpaginate(config){this.piececlass=config.piececlass
var elementType=(typeof config.piececontainer=="undefined")?"div":config.piececontainer
this.pieces=virtualpaginate.collectElementbyClass(config.piececlass,elementType)
this.chunksize=(typeof config.pieces_per_page=="undefined")?1:(config.pieces_per_page>0&&config.pieces_per_page<this.pieces.length)?config.pieces_per_page:this.pieces.length
this.pagecount=Math.ceil(this.pieces.length/this.chunksize)
this.paginatediv=[],this.flatviewlinks=[],this.cpspan=[],this.selectmenu=[]
this.persist=config.persist
var persistedpage=virtualpaginate.getCookie("dd_"+this.piececlass)||0
var urlselectedpage=virtualpaginate.urlparamselect(this.piececlass)
this.currentpage=(typeof urlselectedpage=="number")?urlselectedpage:((this.persist)?persistedpage:config.defaultpage)
this.currentpage=(this.currentpage<this.pagecount)?parseInt(this.currentpage):0
this.showpage(this.currentpage)}
virtualpaginate.prototype.navigate=function(keyword){var prevlinkindex=this.currentpage
if(keyword=="previous")
this.currentpage=(this.currentpage>0)?this.currentpage-1:(this.currentpage==0)?this.pagecount-1:0
else if(keyword=="next")
this.currentpage=(this.currentpage<this.pagecount-1)?this.currentpage+1:0
else if(keyword=="first")
this.currentpage=0
else if(keyword=="last")
this.currentpage=this.pagecount-1
else
this.currentpage=parseInt(keyword)
this.currentpage=(this.currentpage<this.pagecount)?this.currentpage:0
this.showpage(this.currentpage)
for(var p=0;p<this.paginatediv.length;p++){if(this.flatviewpresent)
this.flatviewlinks[p][prevlinkindex].className=""
if(this.selectmenupresent)
this.selectmenu[p].selectedIndex=this.currentpage
if(this.flatviewpresent)
this.flatviewlinks[p][this.currentpage].className="selected"}}
virtualpaginate.prototype.buildpagination=function(divids,optnavtext){var divids=(typeof divids=="string")?[divids]:divids
var primarypaginatediv=divids.shift()
var paginaterawHTML=document.getElementById(primarypaginatediv).innerHTML
this.paginate_build(primarypaginatediv,0,optnavtext)
for(var i=0;i<divids.length;i++){document.getElementById(divids[i]).innerHTML=paginaterawHTML
this.paginate_build(divids[i],i+1,optnavtext)}}
virtualpaginate.collectElementbyClass=function(classname,element){if(document.querySelectorAll){var pieces=document.querySelectorAll(element+"."+classname)}
else{var classnameRE=new RegExp("(^|\\s+)"+classname+"($|\\s+)","i")
var pieces=[]
var alltags=document.getElementsByTagName(element)
for(var i=0;i<alltags.length;i++){if(typeof alltags[i].className=="string"&&alltags[i].className.search(classnameRE)!=-1)
pieces[pieces.length]=alltags[i]}}
return pieces}
virtualpaginate.urlparamselect=function(vpclass){var result=window.location.search.match(new RegExp(vpclass+"=(\\d+)","i"))
return(result==null)?null:parseInt(RegExp.$1)}
virtualpaginate.getCookie=function(Name){var re=new RegExp(Name+"=[^;]+","i");if(document.cookie.match(re))
return document.cookie.match(re)[0].split("=")[1]
return null}
virtualpaginate.setCookie=function(name,value){document.cookie=name+"="+value}
virtualpaginate.prototype.showpage=function(pagenumber){var totalitems=this.pieces.length
var showstartindex=pagenumber*this.chunksize
var showendindex=showstartindex+this.chunksize-1
for(var i=0;i<totalitems;i++){if(i>=showstartindex&&i<=showendindex)
this.pieces[i].style.display="block"
else
this.pieces[i].style.display="none"}
if(this.persist){virtualpaginate.setCookie("dd_"+this.piececlass,this.currentpage)}
if(this.cpspan.length>0){for(var p=0;p<this.cpspan.length;p++)
this.cpspan[p].innerHTML='Page '+(this.currentpage+1)+'/'+this.pagecount}}
virtualpaginate.prototype.paginate_build=function(divid,divpos,optnavtext){var instanceOfBox=this
var paginatediv=document.getElementById(divid)
if(this.chunksize==this.pieces.length){paginatediv.style.display="none"
return}
var paginationcode=paginatediv.innerHTML
if(paginatediv.getElementsByTagName("select").length>0)
this.paginate_build_selectmenu(paginatediv.getElementsByTagName("select")[0],divpos,optnavtext)
if(paginatediv.getElementsByTagName("a").length>0)
this.paginate_build_regularlinks(paginatediv.getElementsByTagName("a"))
var allspans=paginatediv.getElementsByTagName("span")
for(var i=0;i<allspans.length;i++){if(allspans[i].className=="flatview")
this.paginate_output_flatview(allspans[i],divpos,optnavtext)
else if(allspans[i].className=="paginateinfo")
this.paginate_build_cpinfo(allspans[i],divpos)}
this.paginatediv[divpos]=paginatediv}
virtualpaginate.prototype.paginate_output_flatview=function(flatviewcontainer,divpos,anchortext){var flatviewhtml=""
var anchortext=anchortext||new Array()
for(var i=0;i<this.pagecount;i++){if(typeof anchortext[i]!="undefined")
flatviewhtml+='<a href="#flatview" rel="'+i+'">'+anchortext[i]+'</a> '
if(typeof anchortext[i]!="3")
flatviewhtml+='<a href="#flatview" rel="'+i+'">'+(i+1)+'</a> &nbsp;&nbsp;'}
flatviewcontainer.innerHTML=flatviewhtml
this.paginate_build_flatview(flatviewcontainer,divpos,anchortext)}
virtualpaginate.prototype.paginate_build_flatview=function(flatviewcontainer,divpos,anchortext){var instanceOfBox=this
var flatviewhtml=""
this.flatviewlinks[divpos]=flatviewcontainer.getElementsByTagName("a")
for(var i=0;i<this.flatviewlinks[divpos].length;i++){this.flatviewlinks[divpos][i].onclick=function(){var prevlinkindex=instanceOfBox.currentpage
var curlinkindex=parseInt(this.getAttribute("rel"))
instanceOfBox.navigate(curlinkindex)
return false}}
this.flatviewlinks[divpos][this.currentpage].className="selected"
this.flatviewpresent=true}
virtualpaginate.prototype.paginate_build_selectmenu=function(paginatedropdown,divpos,anchortext){var instanceOfBox=this
var anchortext=anchortext||new Array()
this.selectmenupresent=1
for(var i=0;i<this.pagecount;i++){if(typeof anchortext[i]!="undefined")
paginatedropdown.options[i]=new Option(anchortext[i],i)
else
paginatedropdown.options[i]=new Option("Page "+(i+1)+" of "+this.pagecount,i)}
paginatedropdown.selectedIndex=this.currentpage
setTimeout(function(){paginatedropdown.selectedIndex=instanceOfBox.currentpage},500)
paginatedropdown.onchange=function(){instanceOfBox.navigate(this.selectedIndex)}
this.selectmenu[divpos]=paginatedropdown
this.selectmenu[divpos].selectedIndex=this.currentpage}
virtualpaginate.prototype.paginate_build_regularlinks=function(paginatelinks){var instanceOfBox=this
for(var i=0;i<paginatelinks.length;i++){var currentpagerel=paginatelinks[i].getAttribute("rel")
if(currentpagerel=="previous"||currentpagerel=="next"||currentpagerel=="first"||currentpagerel=="last"){paginatelinks[i].onclick=function(){instanceOfBox.navigate(this.getAttribute("rel"))
return false}}}}
virtualpaginate.prototype.paginate_build_cpinfo=function(cpspan,divpos){this.cpspan[divpos]=cpspan
cpspan.innerHTML='Page '+(this.currentpage+1)+'/'+this.pagecount}
function blockError(){return true;}
window.onerror=blockError;
