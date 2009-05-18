// Copyright (c) 2009 James Hunt
//
// Permission is hereby granted, free of charge, to any person
// obtaining a copy of this software and associated documentation
// files (the "Software"), to deal in the Software without
// restriction, including without limitation the rights to use,
// copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the
// Software is furnished to do so, subject to the following
// conditions:
// 
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
// OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
// HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
// WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
// OTHER DEALINGS IN THE SOFTWARE.


(function($) {
	
	var selectedElement = null
	var defaultOptions = {
		bindings: {
		'w': moveUpInList,
		's': moveDownInList
		}
	}
	
	$.fn.traversableList = function(opts) {
		var options = $.extend(true, {}, defaultOptions, opts || {})
		
		$(this).addClass('traversableList')
		$(this).children('li').click(function() {
			selectElement($(this))
		})
		$(document).click(function(event) {
			if($(event.target).parents('.traversableList').length == 0) {
				selectElement(null)
			}
		})
		$.each(options.bindings, function(key, callback) {
			$(document).bind('keydown', key, function() {
				if(selectedElement) callback(selectedElement)
			})
		})
	}
	
	function moveUpInList(elem) {
		var prev = $(elem.prev())
		if(prev.length > 0) selectElement($(prev[0]))
	}
	
	function moveDownInList(elem) {
		var next = $(elem.next())
		if(next.length > 0) selectElement($(next[0]))
	}
	
	function selectElement(elem) {
		if(selectedElement) selectedElement.removeClass("selected")
		selectedElement = elem
		if(elem) elem.addClass('selected')
	}
})(jQuery)