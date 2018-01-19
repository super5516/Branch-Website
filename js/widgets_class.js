// JavaScript Document


if (!window.Node) {
  var Node = {            // If there is no Node object, define one
    ELEMENT_NODE: 1,    // with the following properties and values.
    ATTRIBUTE_NODE: 2,  // Note that these are HTML node types only.
    TEXT_NODE: 3,       // For XML-specific nodes, you need to add
    COMMENT_NODE: 8,    // other constants here.
    DOCUMENT_NODE: 9,
    DOCUMENT_FRAGMENT_NODE: 11
  }
  } 

var ARIA_STATE = "aria-";

/**
 * Widgets Object is used to initialize a set of controls 
 * and provide a conveinence fuction to cancel event propagration
 * @construtor
 */

function Widgets() {  
  this.widgets = new Array();
}

/**
 * add is member of the Widgets Object 
 * and used add a widget ot the list of widgets to be intitialized 
 * as part of the onload event
 * The controls array is the list of controls to initialize
 * @member Enable
 * @return none
 */

Widgets.prototype.add = function(obj) {
  this.widgets[this.widgets.length] = obj;
}

/**
 * init is member of the Widgets Object 
 * and is called by the onload event to initialize widgets in the web resource
 * The controls array is the list of controls to initialize
 * @member Enable
 * @return none
 */

Widgets.prototype.init = function() {

  for(var i = 0; i < this.widgets.length; i++ )
    this.widgets[i].init();
}

//
// convience function for getting the node based on id

function _$( id ) {
  return document.getElementById( id );	
}


//
// WebBrowser object to abstract accessibility API differences between web standards supporting browsers and Internet Explorer 7.0
//
// The state variable keeps track of current state of checkbox
function WebBrowser() {

}

/**
 * Mouse capture
 *
 * @param ( node ) DOM node object
 * @return nothing
 */

if ( document.addEventListener ) {

  // If a web standards based browser implement this function

  WebBrowser.prototype.setMouseCapture = function( node, clickHandler, downHandler, moveHandler, upHandler ) {

    if( clickHandler )
      document.addEventListener( "click",     clickHandler, true );

    if( downHandler )
      document.addEventListener( "mousedown", downHandler,  true );

    if( moveHandler )
      document.addEventListener( "mousemove", moveHandler,  true );

    if( upHandler)
      document.addEventListener( "mouseup",   upHandler,    true );

  }

  WebBrowser.prototype.releaseMouseCapture = function( node, clickHandler, downHandler, moveHandler, upHandler ) {

    if( upHandler)
      document.removeEventListener( "mouseup",   upHandler,    true );

    if( moveHandler )
      document.removeEventListener( "mousemove", moveHandler,  true );

    if( downHandler )
      document.removeEventListener( "mousedown", downHandler,  true );

    if( clickHandler )
      document.removeEventListener( "click",     clickHandler, true );

  }

} else {

  // If a Microsoft IE based browser implement this function

  WebBrowser.prototype.setMouseCapture = function( node, clickHandler, downHandler, moveHandler, upHandler ) {

    node.setCapture();
    if( clickHandler)
      node.attachEvent( "onclick", clickHandler );

    if( downHandler)
      node.attachEvent( "onmousedown", downHandler );

    if( moveHandler )
      node.attachEvent( "onmousemove", moveHandler );

    if( upHandler )
      node.attachEvent( "onmouseup", upHandler );

  } // endif

  WebBrowser.prototype.releaseMouseCapture = function( node, clickHandler, downHandler, moveHandler, upHandler ) {

    if( upHandler )
      node.detachEvent( "onmouseup", upHandler );

    if( moveHandler )
      node.detachEvent( "onmousemove", moveHandler );

    if( downHandler)
      node.detachEvent( "onmousedown", downHandler );

    if( clickHandler)
      node.detachEvent( "onclick", clickHandler );

    node.releaseCapture();

  } // endif


}

/**
 * OnClick Event Simulator
 *
 * @param ( node ) DOM node object
 * @return nothing
 */

if( document.createEvent ) {

  // If a web standards based browser implement this function

  WebBrowser.prototype.simulateOnClickEvent = function( node ) {
    // W3C DOM Events way to trigger a "click" event
    var e = document.createEvent('MouseEvents');
    e.initEvent( 'click', true, true );

    node.dispatchEvent( e );

  }

} else {

  // If a Microsoft IE based browser implement this function

  WebBrowser.prototype.simulateOnClickEvent = function( node ) {

    var e = document.createEventObject();
    node.fireEvent( "onclick", e );

  } // endif

}

//
// keyCode is a function to get the keycode from a keypress event
//
// @param ( event object) event is an event object
//
// @return ( keycode ) 

WebBrowser.prototype.keyCode = function( event ) {
  var e = event || window.event;

  return e.keyCode;

}  

if (typeof document.documentElement.setAttributeNS != 'undefined') {

  WebBrowser.prototype.stopPropagation = function( event ) {
    event.stopPropagation();
    event.preventDefault();
    return false;
  }

  WebBrowser.prototype.target = function( event ) {
    return event.target;
  }

  WebBrowser.prototype.charCode = function(event) {
    return event.charCode;
  }

  WebBrowser.prototype.calculateOffsetLeft = function( node ) {
    return node.offsetLeft;	  
  }

  WebBrowser.prototype.calculateOffsetTop = function( node ) {
    return node.offsetTop;	  
  }

  WebBrowser.prototype.pageX = function( e ) {
    return e.pageX;	  
  }

  WebBrowser.prototype.pageY = function( e ) {
    return e.pageY;	  
  }

} else {

  WebBrowser.prototype.stopPropagation = function( event ) {
    window.event.cancelBubble = true; 
    window.event.returnValue = false;
    return false;
  }

  WebBrowser.prototype.charCode = function(event) {
    return window.browser.keyCode( event );
  }

  WebBrowser.prototype.target = function( event ) {
    return window.event.srcElement;
  }

  WebBrowser.prototype.calculateOffsetLeft = function(node) {
    var offset = 0;

    while( node ) {
      offset += node.offsetLeft;
      node = node.offsetParent;
    }

    return offset;	  
  }

  WebBrowser.prototype.calculateOffsetTop = function(node) {
    var offset = 0;

    while( node ) {
      offset = offset + node.offsetTop;
      node = node.offsetParent;
    }

    return offset;	  
  }

  WebBrowser.prototype.pageX = function( e ) {
    return e.clientX + document.body.scrollLeft;	  
  }

  WebBrowser.prototype.pageY = function( e ) {
    return e.clientY + document.body.scrollTop;	  
  }

};


if (document.addEventListener) {

  // Functions for W3C Standards compliant implementation of adding event handlers

  WebBrowser.prototype.addEvent = function(elmTarget, sEventName, fCallback) {
    elmTarget.addEventListener(sEventName, fCallback, false);
    returnValue = true;
  };

  WebBrowser.prototype.removeEvent = function(elmTarget, sEventName, fCallback) {
    elmTarget.removeEventListener(sEventName, fCallback, false);
    returnValue = true;
  };

  WebBrowser.prototype.addChangeEvent =  function(elmTarget, fCallback) {
    elmTarget.addEventListener("DOMAttrModified", fCallback, false);
    returnValue = true;
  };

} else {

  if(document.attachEvent) {

    // IE Specific Event handler functions
    WebBrowser.prototype.addEvent = function(elmTarget, sEventName, fCallback) {
      returnValue = elmTarget.attachEvent('on' + sEventName, fCallback);
    };

    WebBrowser.prototype.removeEvent = function(elmTarget, sEventName, fCallback) {
      returnValue = elmTarget.detachEvent('on' + sEventName, fCallback);
    };

    WebBrowser.prototype.addChangeEvent =  function(elmTarget, fCallback) {
      returnValue = elmTarget.attachEvent("onpropertychange", fCallback);
    };

  } else {

    // For browsers that do not support W3C or IE event functions
    WebBrowser.prototype.addEvent = function(elmTarget, sEventName, fCallback) {
      return false;
    };

    WebBrowser.prototype.removeEvent = function(elmTarget, sEventName, fCallback) {
      return false;
    };

    WebBrowser.prototype.addChangeEvent =  function(elmTarget, fCallback) {
      return false;
    };

  }

}



//
// ARIA functions to absract the setting and reading of ARIA features
// This is important since the ARIA specification is not completely defined
// This makes it easier to make syntactic changes to examples
//

function ARIA() {

}

ARIA.prototype.setAriaState = function(elmTarget, sStateName, sStateValue) {
  elmTarget.setAttribute(ARIA_STATE + sStateName, sStateValue);
}

ARIA.prototype.setRole = function(elmTarget, sStateValue) {
  elmTarget.setAttribute("role", sStateValue);
}

ARIA.prototype.getAriaState = function(elmTarget, sStateName) {
  return elmTarget.getAttribute(ARIA_STATE + sStateName);
}

ARIA.prototype.removeAriaState = function(elmTarget, sStateName) {
  return elmTarget.removeAttribute(ARIA_STATE + sStateName);
}

ARIA.prototype.hasAriaState = function(elmTarget, sStateName) {
  return elmTarget.hasAttribute(ARIA_STATE + sStateName);
}


ARIA.prototype.setRolesAndStates = function(elmAccessible)
{
  var STATE_MACHINE_BEGIN = 0;
  var STATE_MACHINE_IN_ACCESSIBLE = 1;
  var STATE_MACHINE_ROLE_IS_SET = 2;

  var sClass = elmAccessible.className;
  var arClassNames = sClass.split(' ');
  var machineState = STATE_MACHINE_BEGIN;
  var role = "";

  for (j = 0; j < arClassNames.length; j++) {

    // Delete spaces in CNAMEs
    var sClass = arClassNames[j].replace(/ /g, '');

    // alert(sClass + " " + machineState);
    // Test to see if there are any CNAMEs to process, if not exit
    if (!sClass) { continue; }

    // Look for CNAMEs assocaited with ARIA markup
    if ( sClass == 'axs' ) {

      /* found "axs" accessible keyword, rest of class will be treated as ARIA roles and states */
      machineState = STATE_MACHINE_IN_ACCESSIBLE;

    } else if (machineState == STATE_MACHINE_IN_ACCESSIBLE) {

      /* found role, set it and move on */
      this.setRole(elmAccessible, sClass);

      machineState = STATE_MACHINE_ROLE_IS_SET;
      role = sClass;

    } else if (machineState == STATE_MACHINE_ROLE_IS_SET) {

      /* found state, set it and look for more */
      if (sClass.indexOf('-') != -1) {

        /* state has specific value, parse it out and set it */
        var arValue = sClass.split(/-/);

        // arValue[0] is state name, arValue[1] is value 
        // 
        // test for tabindex value
        if( arValue[0] != "tabindex" )
          //
          // If not tabindex set the aria property and value
          this.setAriaState(elmAccessible, arValue[0], arValue[1]);
        else {
          //
          // If tabindex use Microsoft IE property to set tabindex value
          if( arValue[1] != "" ) {
            // alert("Tabindex=" + arvalue[1]);
            elmAccessible.tabIndex = arValue[1];		  
          } else {
            // if tabindex value is undefined assume it is a negative number and set tabindex=-1
            // alert("Tabindex=-1");
            elmAccessible.tabIndex = -1;		  		  
          }
        }
      } else {
        /* state is simply a name, value is null - make it a string to match other values as strings*/
        this.setAriaState(elmAccessible, sClass, "");
      }
    }
  }
};



initApp = function(elmRoot) {

  if (document.isInitialized) {
    return;  // Avoid second initialization -- we inited early because of DOMContentLoaded
  }

  document.isInitialized = true;

  // If elmRoot is undefined start with the BODY element

  if ((!elmRoot) || (!elmRoot.getElementsByTagName)) {
    elmRoot = document.body;
  }

  // Check elmRoot node for information in the CLASS attribute to convert to ARIA markup

  if (/axs /.test(elmRoot.className)) {
    aria.setRolesAndStates(elmRoot);  // First do root element
  }

  //
  // Check for W3C Standards compliant implementation of XPATH evaluation
  if (document.evaluate) {

    // Get ARIA Roles and States  
    var snapAccessibleElements = document.evaluate(".//*[contains(@class, 'axs ')]", elmRoot, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = snapAccessibleElements.snapshotLength - 1; i >= 0; i--) {
      aria.setRolesAndStates(snapAccessibleElements.snapshotItem(i), "wairole:");
    }

    //
    // Otherwise use Micrsoft IE technique for identifying nodes
  } else {
    var axsElements = new Array();
    var axsElementCount = 0;

    var arElements = (typeof elmRoot.all != 'undefined') ? elmRoot.all : elmRoot.getElementsByTagName('*');
    var iElementCount = arElements.length;

    //
    // Find elements with ARIA markup and save their IDs
    for (var i = 0; i < iElementCount; i++) {
      if (/axs /.test(arElements[i].className)) {
        aria.setRolesAndStates(arElements[i]);
      } // endif
    } // endfor

  }  // endif

  // Initialize widgets

  widgets.init();

};

// Initialize global variables used to initial widgets and provide browser independence for handling events and lack of namespace support in IE DOM functions

widgets_flag = true;
var widgets = new Widgets();
var browser = new WebBrowser();
var aria = new ARIA();
