/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./H5P.Blanks/src/cloze.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./H5P.Blanks/src/cloze.js":
/*!*********************************!*\
  !*** ./H5P.Blanks/src/cloze.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("(function ($, Blanks) {\n  /**\n   * Simple private class for keeping track of clozes.\n   *\n   * @class H5P.Blanks.Cloze\n   * @param {string} answer\n   * @param {Object} behaviour Behavioral settings for the task from semantics\n   * @param {boolean} behaviour.acceptSpellingErrors - If true, answers will also count correct if they contain small spelling errors.\n   * @param {string} defaultUserAnswer\n   * @param {Object} l10n Localized texts\n   * @param {string} l10n.solutionLabel Assistive technology label for cloze solution\n   * @param {string} l10n.inputLabel Assistive technology label for cloze input\n   * @param {string} l10n.inputHasTipLabel Assistive technology label for input with tip\n   * @param {string} l10n.tipLabel Label for tip icon\n   */\n  Blanks.Cloze = function (solution, behaviour, defaultUserAnswer, ttsID, l10n) {\n    var self = this;\n    var $input, $wrapper;\n    var answers = solution.solutions;\n    var answer = answers.join('/');\n    var tip = solution.tip;\n    var checkedAnswer = null;\n    var inputLabel = l10n.inputLabel;\n    var enableTTSButtons = behaviour.enableTTSButtons;\n\n    if (behaviour.caseSensitive !== true) {\n      // Convert possible solutions into lowercase\n      for (var i = 0; i < answers.length; i++) {\n        answers[i] = answers[i].toLowerCase();\n      }\n    }\n    /**\n     * Check if the answer is correct.\n     *\n     * @private\n     * @param {string} answered\n     */\n\n\n    var correct = function correct(answered) {\n      if (behaviour.caseSensitive !== true) {\n        answered = answered.toLowerCase();\n      }\n\n      for (var i = 0; i < answers.length; i++) {\n        // Damerau-Levenshtein comparison\n        if (behaviour.acceptSpellingErrors === true) {\n          var levenshtein = H5P.TextUtilities.computeLevenshteinDistance(answered, answers[i], true);\n          /*\n           * The correctness is temporarily computed by word length and number of number of operations\n           * required to change one word into the other (Damerau-Levenshtein). It's subject to\n           * change, cmp. https://github.com/otacke/udacity-machine-learning-engineer/blob/master/submissions/capstone_proposals/h5p_fuzzy_blanks.md\n           */\n\n          if (answers[i].length > 9 && levenshtein <= 2) {\n            return true;\n          } else if (answers[i].length > 3 && levenshtein <= 1) {\n            return true;\n          }\n        } // regular comparison\n\n\n        if (answered === answers[i]) {\n          return true;\n        }\n      }\n\n      return false;\n    };\n    /**\n     * Check if filled out.\n     *\n     * @param {boolean}\n     */\n\n\n    this.filledOut = function () {\n      var answered = this.getUserAnswer(); // Blank can be correct and is interpreted as filled out.\n\n      return answered !== '' || correct(answered);\n    };\n    /**\n     * Check the cloze and mark it as wrong or correct.\n     */\n\n\n    this.checkAnswer = function () {\n      checkedAnswer = this.getUserAnswer();\n      var isCorrect = correct(checkedAnswer);\n\n      if (isCorrect) {\n        $wrapper.addClass('h5p-correct');\n        $input.attr('disabled', true).attr('aria-label', inputLabel + '. ' + l10n.answeredCorrectly);\n      } else {\n        $wrapper.addClass('h5p-wrong');\n        $input.attr('aria-label', inputLabel + '. ' + l10n.answeredIncorrectly);\n      }\n    };\n    /**\n     * Disables input.\n     * @method disableInput\n     */\n\n\n    this.disableInput = function () {\n      this.toggleInput(false);\n    };\n    /**\n     * Enables input.\n     * @method enableInput\n     */\n\n\n    this.enableInput = function () {\n      this.toggleInput(true);\n    };\n    /**\n     * Toggles input enable/disable\n     * @method toggleInput\n     * @param  {boolean}   enabled True if input should be enabled, otherwise false\n     */\n\n\n    this.toggleInput = function (enabled) {\n      $input.attr('disabled', !enabled);\n    };\n    /**\n     * Show the correct solution.\n     */\n\n\n    this.showSolution = function () {\n      if (correct(this.getUserAnswer())) {\n        return; // Only for the wrong ones\n      }\n\n      $('<span>', {\n        'aria-hidden': true,\n        'class': 'h5p-correct-answer',\n        text: answer,\n        insertAfter: $wrapper\n      });\n      $input.attr('disabled', true);\n      var ariaLabel = inputLabel + '. ' + l10n.solutionLabel + ' ' + answer + '. ' + l10n.answeredIncorrectly;\n      $input.attr('aria-label', ariaLabel);\n    };\n    /**\n     * @returns {boolean}\n     */\n\n\n    this.correct = function () {\n      return correct(this.getUserAnswer());\n    };\n    /**\n     * Set input element.\n     *\n     * @param {H5P.jQuery} $element\n     * @param {function} afterCheck\n     * @param {function} afterFocus\n     * @param {number} clozeIndex Index of cloze\n     * @param {number} totalCloze Total amount of clozes in blanks\n     */\n\n\n    this.setInput = function ($element, afterCheck, afterFocus, clozeIndex, totalCloze) {\n      $input = $element;\n      $wrapper = $element.parent();\n      inputLabel = inputLabel.replace('@num', clozeIndex + 1).replace('@total', totalCloze); // Add tip if tip is set\n\n      if (tip !== undefined && tip.trim().length > 0) {\n        $wrapper.addClass('has-tip').append(H5P.JoubelUI.createTip(tip, {\n          tipLabel: l10n.tipLabel\n        }));\n        inputLabel += '. ' + l10n.inputHasTipLabel;\n      }\n\n      $input.attr('aria-label', inputLabel);\n\n      if (afterCheck !== undefined) {\n        $input.blur(function () {\n          if (self.filledOut()) {\n            // Check answers\n            if (!behaviour.enableRetry) {\n              self.disableInput();\n            }\n\n            self.checkAnswer();\n            afterCheck.apply(self);\n          }\n        });\n      }\n\n      $input.keyup(function () {\n        if (checkedAnswer !== null && checkedAnswer !== self.getUserAnswer()) {\n          // The Answer has changed since last check\n          checkedAnswer = null;\n          $wrapper.removeClass('h5p-wrong');\n          $input.attr('aria-label', inputLabel);\n\n          if (afterFocus !== undefined) {\n            afterFocus();\n          }\n        }\n      });\n    };\n    /**\n     * @returns {string} Cloze html\n     */\n\n\n    this.toString = function () {\n      var extra = defaultUserAnswer ? ' value=\"' + defaultUserAnswer + '\"' : '';\n      var ttsButton = enableTTSButtons === true ? '<button class=\"h5p-action-button\" data-id=\"' + ttsID + '\">X</button>' : '';\n      var result = '<span class=\"h5p-input-wrapper\">' + ttsButton + '<input type=\"text\" class=\"h5p-text-input\" autocomplete=\"off\" autocapitalize=\"off\"' + extra + '></span>';\n      self.length = result.length;\n      return result;\n    };\n    /**\n     * @returns {string} Trimmed answer\n     */\n\n\n    this.getUserAnswer = function () {\n      return H5P.trim($input.val());\n    };\n    /**\n     * @returns {string} Answer\n     */\n\n\n    this.getUserInput = function () {\n      return $input.val();\n    };\n    /**\n     * @param {string} text New input text\n     */\n\n\n    this.setUserInput = function (text) {\n      $input.val(text);\n    };\n    /**\n     * Resets aria label of input field\n     */\n\n\n    this.resetAriaLabel = function () {\n      $input.attr('aria-label', inputLabel);\n    };\n  };\n})(H5P.jQuery, H5P.Blanks);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9INVAuQmxhbmtzL3NyYy9jbG96ZS5qcz81MDAwIl0sIm5hbWVzIjpbIiQiLCJCbGFua3MiLCJDbG96ZSIsInNvbHV0aW9uIiwiYmVoYXZpb3VyIiwiZGVmYXVsdFVzZXJBbnN3ZXIiLCJ0dHNJRCIsImwxMG4iLCJzZWxmIiwiJGlucHV0IiwiJHdyYXBwZXIiLCJhbnN3ZXJzIiwic29sdXRpb25zIiwiYW5zd2VyIiwiam9pbiIsInRpcCIsImNoZWNrZWRBbnN3ZXIiLCJpbnB1dExhYmVsIiwiZW5hYmxlVFRTQnV0dG9ucyIsImNhc2VTZW5zaXRpdmUiLCJpIiwibGVuZ3RoIiwidG9Mb3dlckNhc2UiLCJjb3JyZWN0IiwiYW5zd2VyZWQiLCJhY2NlcHRTcGVsbGluZ0Vycm9ycyIsImxldmVuc2h0ZWluIiwiSDVQIiwiVGV4dFV0aWxpdGllcyIsImNvbXB1dGVMZXZlbnNodGVpbkRpc3RhbmNlIiwiZmlsbGVkT3V0IiwiZ2V0VXNlckFuc3dlciIsImNoZWNrQW5zd2VyIiwiaXNDb3JyZWN0IiwiYWRkQ2xhc3MiLCJhdHRyIiwiYW5zd2VyZWRDb3JyZWN0bHkiLCJhbnN3ZXJlZEluY29ycmVjdGx5IiwiZGlzYWJsZUlucHV0IiwidG9nZ2xlSW5wdXQiLCJlbmFibGVJbnB1dCIsImVuYWJsZWQiLCJzaG93U29sdXRpb24iLCJ0ZXh0IiwiaW5zZXJ0QWZ0ZXIiLCJhcmlhTGFiZWwiLCJzb2x1dGlvbkxhYmVsIiwic2V0SW5wdXQiLCIkZWxlbWVudCIsImFmdGVyQ2hlY2siLCJhZnRlckZvY3VzIiwiY2xvemVJbmRleCIsInRvdGFsQ2xvemUiLCJwYXJlbnQiLCJyZXBsYWNlIiwidW5kZWZpbmVkIiwidHJpbSIsImFwcGVuZCIsIkpvdWJlbFVJIiwiY3JlYXRlVGlwIiwidGlwTGFiZWwiLCJpbnB1dEhhc1RpcExhYmVsIiwiYmx1ciIsImVuYWJsZVJldHJ5IiwiYXBwbHkiLCJrZXl1cCIsInJlbW92ZUNsYXNzIiwidG9TdHJpbmciLCJleHRyYSIsInR0c0J1dHRvbiIsInJlc3VsdCIsInZhbCIsImdldFVzZXJJbnB1dCIsInNldFVzZXJJbnB1dCIsInJlc2V0QXJpYUxhYmVsIiwialF1ZXJ5Il0sIm1hcHBpbmdzIjoiQUFBQSxDQUFDLFVBQVVBLENBQVYsRUFBYUMsTUFBYixFQUFxQjtBQUVwQjs7Ozs7Ozs7Ozs7Ozs7QUFjQUEsUUFBTSxDQUFDQyxLQUFQLEdBQWUsVUFBVUMsUUFBVixFQUFvQkMsU0FBcEIsRUFBK0JDLGlCQUEvQixFQUFrREMsS0FBbEQsRUFBeURDLElBQXpELEVBQStEO0FBQzVFLFFBQUlDLElBQUksR0FBRyxJQUFYO0FBQ0EsUUFBSUMsTUFBSixFQUFZQyxRQUFaO0FBQ0EsUUFBSUMsT0FBTyxHQUFHUixRQUFRLENBQUNTLFNBQXZCO0FBQ0EsUUFBSUMsTUFBTSxHQUFHRixPQUFPLENBQUNHLElBQVIsQ0FBYSxHQUFiLENBQWI7QUFDQSxRQUFJQyxHQUFHLEdBQUdaLFFBQVEsQ0FBQ1ksR0FBbkI7QUFDQSxRQUFJQyxhQUFhLEdBQUcsSUFBcEI7QUFDQSxRQUFJQyxVQUFVLEdBQUdWLElBQUksQ0FBQ1UsVUFBdEI7QUFDQSxRQUFJQyxnQkFBZ0IsR0FBR2QsU0FBUyxDQUFDYyxnQkFBakM7O0FBRUEsUUFBSWQsU0FBUyxDQUFDZSxhQUFWLEtBQTRCLElBQWhDLEVBQXNDO0FBQ3BDO0FBQ0EsV0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHVCxPQUFPLENBQUNVLE1BQTVCLEVBQW9DRCxDQUFDLEVBQXJDLEVBQXlDO0FBQ3ZDVCxlQUFPLENBQUNTLENBQUQsQ0FBUCxHQUFhVCxPQUFPLENBQUNTLENBQUQsQ0FBUCxDQUFXRSxXQUFYLEVBQWI7QUFDRDtBQUNGO0FBRUQ7Ozs7Ozs7O0FBTUEsUUFBSUMsT0FBTyxHQUFHLFNBQVZBLE9BQVUsQ0FBVUMsUUFBVixFQUFvQjtBQUNoQyxVQUFJcEIsU0FBUyxDQUFDZSxhQUFWLEtBQTRCLElBQWhDLEVBQXNDO0FBQ3BDSyxnQkFBUSxHQUFHQSxRQUFR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QUt2QyxhQUFMLEdBQXFCLFlBQVk7QUFDL0IsYUFBT0osR0FBRyxDQUFDNkIsSUFBSixDQUFTL0MsTUFBTSxDQUFDOEQsR0FBUCxFQUFULENBQVA7QUFDRCxLQUZEO0FBSUE7Ozs7O0FBR0EsU0FBS0MsWUFBTCxHQUFvQixZQUFZO0FBQzlCLGFBQU8vRCxNQUFNLENBQUM4RCxHQUFQLEVBQVA7QUFDRCxLQUZEO0FBSUE7Ozs7O0FBR0EsU0FBS0UsWUFBTCxHQUFvQixVQUFVOUIsSUFBVixFQUFnQjtBQUNsQ2xDLFlBQU0sQ0FBQzhELEdBQVAsQ0FBVzVCLElBQVg7QUFDRCxLQUZEO0FBSUE7Ozs7O0FBR0EsU0FBSytCLGNBQUwsR0FBc0IsWUFBWTtBQUNoQ2pFLFlBQU0sQ0FBQzBCLElBQVAsQ0FBWSxZQUFaLEVBQTBCbEIsVUFBMUI7QUFDRCxLQUZEO0FBR0QsR0E3TkQ7QUErTkQsQ0EvT0QsRUErT0dVLEdBQUcsQ0FBQ2dELE1BL09QLEVBK09laEQsR0FBRyxDQUFDMUIsTUEvT25CIiwiZmlsZSI6Ii4vSDVQLkJsYW5rcy9zcmMvY2xvemUuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gKCQsIEJsYW5rcykge1xuXG4gIC8qKlxuICAgKiBTaW1wbGUgcHJpdmF0ZSBjbGFzcyBmb3Iga2VlcGluZyB0cmFjayBvZiBjbG96ZXMuXG4gICAqXG4gICAqIEBjbGFzcyBINVAuQmxhbmtzLkNsb3plXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBhbnN3ZXJcbiAgICogQHBhcmFtIHtPYmplY3R9IGJlaGF2aW91ciBCZWhhdmlvcmFsIHNldHRpbmdzIGZvciB0aGUgdGFzayBmcm9tIHNlbWFudGljc1xuICAgKiBAcGFyYW0ge2Jvb2xlYW59IGJlaGF2aW91ci5hY2NlcHRTcGVsbGluZ0Vycm9ycyAtIElmIHRydWUsIGFuc3dlcnMgd2lsbCBhbHNvIGNvdW50IGNvcnJlY3QgaWYgdGhleSBjb250YWluIHNtYWxsIHNwZWxsaW5nIGVycm9ycy5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGRlZmF1bHRVc2VyQW5zd2VyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBsMTBuIExvY2FsaXplZCB0ZXh0c1xuICAgKiBAcGFyYW0ge3N0cmluZ30gbDEwbi5zb2x1dGlvbkxhYmVsIEFzc2lzdGl2ZSB0ZWNobm9sb2d5IGxhYmVsIGZvciBjbG96ZSBzb2x1dGlvblxuICAgKiBAcGFyYW0ge3N0cmluZ30gbDEwbi5pbnB1dExhYmVsIEFzc2lzdGl2ZSB0ZWNobm9sb2d5IGxhYmVsIGZvciBjbG96ZSBpbnB1dFxuICAgKiBAcGFyYW0ge3N0cmluZ30gbDEwbi5pbnB1dEhhc1RpcExhYmVsIEFzc2lzdGl2ZSB0ZWNobm9sb2d5IGxhYmVsIGZvciBpbnB1dCB3aXRoIHRpcFxuICAgKiBAcGFyYW0ge3N0cmluZ30gbDEwbi50aXBMYWJlbCBMYWJlbCBmb3IgdGlwIGljb25cbiAgICovXG4gIEJsYW5rcy5DbG96ZSA9IGZ1bmN0aW9uIChzb2x1dGlvbiwgYmVoYXZpb3VyLCBkZWZhdWx0VXNlckFuc3dlciwgdHRzSUQsIGwxMG4pIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdmFyICRpbnB1dCwgJHdyYXBwZXI7XG4gICAgdmFyIGFuc3dlcnMgPSBzb2x1dGlvbi5zb2x1dGlvbnM7XG4gICAgdmFyIGFuc3dlciA9IGFuc3dlcnMuam9pbignLycpO1xuICAgIHZhciB0aXAgPSBzb2x1dGlvbi50aXA7XG4gICAgdmFyIGNoZWNrZWRBbnN3ZXIgPSBudWxsO1xuICAgIHZhciBpbnB1dExhYmVsID0gbDEwbi5pbnB1dExhYmVsO1xuICAgIHZhciBlbmFibGVUVFNCdXR0b25zID0gYmVoYXZpb3VyLmVuYWJsZVRUU0J1dHRvbnM7XG5cbiAgICBpZiAoYmVoYXZpb3VyLmNhc2VTZW5zaXRpdmUgIT09IHRydWUpIHtcbiAgICAgIC8vIENvbnZlcnQgcG9zc2libGUgc29sdXRpb25zIGludG8gbG93ZXJjYXNlXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFuc3dlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgYW5zd2Vyc1tpXSA9IGFuc3dlcnNbaV0udG9Mb3dlckNhc2UoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiB0aGUgYW5zd2VyIGlzIGNvcnJlY3QuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBhbnN3ZXJlZFxuICAgICAqL1xuICAgIHZhciBjb3JyZWN0ID0gZnVuY3Rpb24gKGFuc3dlcmVkKSB7XG4gICAgICBpZiAoYmVoYXZpb3VyLmNhc2VTZW5zaXRpdmUgIT09IHRydWUpIHtcbiAgICAgICAgYW5zd2VyZWQgPSBhbnN3ZXJlZC50b0xvd2VyQ2FzZSgpO1xuICAgICAgfVxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhbnN3ZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIC8vIERhbWVyYXUtTGV2ZW5zaHRlaW4gY29tcGFyaXNvblxuICAgICAgICBpZiAoYmVoYXZpb3VyLmFjY2VwdFNwZWxsaW5nRXJyb3JzID09PSB0cnVlKSB7XG4gICAgICAgICAgdmFyIGxldmVuc2h0ZWluID0gSDVQLlRleHRVdGlsaXRpZXMuY29tcHV0ZUxldmVuc2h0ZWluRGlzdGFuY2UoYW5zd2VyZWQsIGFuc3dlcnNbaV0sIHRydWUpO1xuICAgICAgICAgIC8qXG4gICAgICAgICAgICogVGhlIGNvcnJlY3RuZXNzIGlzIHRlbXBvcmFyaWx5IGNvbXB1dGVkIGJ5IHdvcmQgbGVuZ3RoIGFuZCBudW1iZXIgb2YgbnVtYmVyIG9mIG9wZXJhdGlvbnNcbiAgICAgICAgICAgKiByZXF1aXJlZCB0byBjaGFuZ2Ugb25lIHdvcmQgaW50byB0aGUgb3RoZXIgKERhbWVyYXUtTGV2ZW5zaHRlaW4pLiBJdCdzIHN1YmplY3QgdG9cbiAgICAgICAgICAgKiBjaGFuZ2UsIGNtcC4gaHR0cHM6Ly9naXRodWIuY29tL290YWNrZS91ZGFjaXR5LW1hY2hpbmUtbGVhcm5pbmctZW5naW5lZXIvYmxvYi9tYXN0ZXIvc3VibWlzc2lvbnMvY2Fwc3RvbmVfcHJvcG9zYWxzL2g1cF9mdXp6eV9ibGFua3MubWRcbiAgICAgICAgICAgKi9cbiAgICAgICAgICBpZiAoKGFuc3dlcnNbaV0ubGVuZ3RoID4gOSkgJiYgKGxldmVuc2h0ZWluIDw9IDIpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9IGVsc2UgaWYgKChhbnN3ZXJzW2ldLmxlbmd0aCA+IDMpICYmIChsZXZlbnNodGVpbiA8PSAxKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIHJlZ3VsYXIgY29tcGFyaXNvblxuICAgICAgICBpZiAoYW5zd2VyZWQgPT09IGFuc3dlcnNbaV0pIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiBmaWxsZWQgb3V0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtib29sZWFufVxuICAgICAqL1xuICAgIHRoaXMuZmlsbGVkT3V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIGFuc3dlcmVkID0gdGhpcy5nZXRVc2VyQW5zd2VyKCk7XG4gICAgICAvLyBCbGFuayBjYW4gYmUgY29ycmVjdCBhbmQgaXMgaW50ZXJwcmV0ZWQgYXMgZmlsbGVkIG91dC5cbiAgICAgIHJldHVybiAoYW5zd2VyZWQgIT09ICcnIHx8IGNvcnJlY3QoYW5zd2VyZWQpKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgdGhlIGNsb3plIGFuZCBtYXJrIGl0IGFzIHdyb25nIG9yIGNvcnJlY3QuXG4gICAgICovXG4gICAgdGhpcy5jaGVja0Fuc3dlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGNoZWNrZWRBbnN3ZXIgPSB0aGlzLmdldFVzZXJBbnN3ZXIoKTtcbiAgICAgIHZhciBpc0NvcnJlY3QgPSBjb3JyZWN0KGNoZWNrZWRBbnN3ZXIpO1xuICAgICAgaWYgKGlzQ29ycmVjdCkge1xuICAgICAgICAkd3JhcHBlci5hZGRDbGFzcygnaDVwLWNvcnJlY3QnKTtcbiAgICAgICAgJGlucHV0LmF0dHIoJ2Rpc2FibGVkJywgdHJ1ZSlcbiAgICAgICAgICAuYXR0cignYXJpYS1sYWJlbCcsIGlucHV0TGFiZWwgKyAnLiAnICsgbDEwbi5hbnN3ZXJlZENvcnJlY3RseSk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgJHdyYXBwZXIuYWRkQ2xhc3MoJ2g1cC13cm9uZycpO1xuICAgICAgICAkaW5wdXQuYXR0cignYXJpYS1sYWJlbCcsIGlucHV0TGFiZWwgKyAnLiAnICsgbDEwbi5hbnN3ZXJlZEluY29ycmVjdGx5KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRGlzYWJsZXMgaW5wdXQuXG4gICAgICogQG1ldGhvZCBkaXNhYmxlSW5wdXRcbiAgICAgKi9cbiAgICB0aGlzLmRpc2FibGVJbnB1dCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMudG9nZ2xlSW5wdXQoZmFsc2UpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBFbmFibGVzIGlucHV0LlxuICAgICAqIEBtZXRob2QgZW5hYmxlSW5wdXRcbiAgICAgKi9cbiAgICB0aGlzLmVuYWJsZUlucHV0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy50b2dnbGVJbnB1dCh0cnVlKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogVG9nZ2xlcyBpbnB1dCBlbmFibGUvZGlzYWJsZVxuICAgICAqIEBtZXRob2QgdG9nZ2xlSW5wdXRcbiAgICAgKiBAcGFyYW0gIHtib29sZWFufSAgIGVuYWJsZWQgVHJ1ZSBpZiBpbnB1dCBzaG91bGQgYmUgZW5hYmxlZCwgb3RoZXJ3aXNlIGZhbHNlXG4gICAgICovXG4gICAgdGhpcy50b2dnbGVJbnB1dCA9IGZ1bmN0aW9uIChlbmFibGVkKSB7XG4gICAgICAkaW5wdXQuYXR0cignZGlzYWJsZWQnLCAhZW5hYmxlZCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFNob3cgdGhlIGNvcnJlY3Qgc29sdXRpb24uXG4gICAgICovXG4gICAgdGhpcy5zaG93U29sdXRpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoY29ycmVjdCh0aGlzLmdldFVzZXJBbnN3ZXIoKSkpIHtcbiAgICAgICAgcmV0dXJuOyAvLyBPbmx5IGZvciB0aGUgd3Jvbmcgb25lc1xuICAgICAgfVxuXG4gICAgICAkKCc8c3Bhbj4nLCB7XG4gICAgICAgICdhcmlhLWhpZGRlbic6IHRydWUsXG4gICAgICAgICdjbGFzcyc6ICdoNXAtY29ycmVjdC1hbnN3ZXInLFxuICAgICAgICB0ZXh0OiBhbnN3ZXIsXG4gICAgICAgIGluc2VydEFmdGVyOiAkd3JhcHBlclxuICAgICAgfSk7XG4gICAgICAkaW5wdXQuYXR0cignZGlzYWJsZWQnLCB0cnVlKTtcbiAgICAgIHZhciBhcmlhTGFiZWwgPSBpbnB1dExhYmVsICsgJy4gJyArXG4gICAgICAgIGwxMG4uc29sdXRpb25MYWJlbCArICcgJyArIGFuc3dlciArICcuICcgK1xuICAgICAgICBsMTBuLmFuc3dlcmVkSW5jb3JyZWN0bHk7XG5cbiAgICAgICRpbnB1dC5hdHRyKCdhcmlhLWxhYmVsJywgYXJpYUxhYmVsKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgdGhpcy5jb3JyZWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGNvcnJlY3QodGhpcy5nZXRVc2VyQW5zd2VyKCkpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBTZXQgaW5wdXQgZWxlbWVudC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7SDVQLmpRdWVyeX0gJGVsZW1lbnRcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBhZnRlckNoZWNrXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gYWZ0ZXJGb2N1c1xuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBjbG96ZUluZGV4IEluZGV4IG9mIGNsb3plXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHRvdGFsQ2xvemUgVG90YWwgYW1vdW50IG9mIGNsb3plcyBpbiBibGFua3NcbiAgICAgKi9cbiAgICB0aGlzLnNldElucHV0ID0gZnVuY3Rpb24gKCRlbGVtZW50LCBhZnRlckNoZWNrLCBhZnRlckZvY3VzLCBjbG96ZUluZGV4LCB0b3RhbENsb3plKSB7XG4gICAgICAkaW5wdXQgPSAkZWxlbWVudDtcbiAgICAgICR3cmFwcGVyID0gJGVsZW1lbnQucGFyZW50KCk7XG4gICAgICBpbnB1dExhYmVsID0gaW5wdXRMYWJlbC5yZXBsYWNlKCdAbnVtJywgKGNsb3plSW5kZXggKyAxKSlcbiAgICAgICAgLnJlcGxhY2UoJ0B0b3RhbCcsIHRvdGFsQ2xvemUpO1xuXG4gICAgICAvLyBBZGQgdGlwIGlmIHRpcCBpcyBzZXRcbiAgICAgIGlmKHRpcCAhPT0gdW5kZWZpbmVkICYmIHRpcC50cmltKCkubGVuZ3RoID4gMCkge1xuICAgICAgICAkd3JhcHBlci5hZGRDbGFzcygnaGFzLXRpcCcpXG4gICAgICAgICAgLmFwcGVuZChINVAuSm91YmVsVUkuY3JlYXRlVGlwKHRpcCwge1xuICAgICAgICAgICAgdGlwTGFiZWw6IGwxMG4udGlwTGFiZWxcbiAgICAgICAgICB9KSk7XG4gICAgICAgIGlucHV0TGFiZWwgKz0gJy4gJyArIGwxMG4uaW5wdXRIYXNUaXBMYWJlbDtcbiAgICAgIH1cblxuICAgICAgJGlucHV0LmF0dHIoJ2FyaWEtbGFiZWwnLCBpbnB1dExhYmVsKTtcblxuICAgICAgaWYgKGFmdGVyQ2hlY2sgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAkaW5wdXQuYmx1cihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgaWYgKHNlbGYuZmlsbGVkT3V0KCkpIHtcbiAgICAgICAgICAgIC8vIENoZWNrIGFuc3dlcnNcbiAgICAgICAgICAgIGlmICghYmVoYXZpb3VyLmVuYWJsZVJldHJ5KSB7XG4gICAgICAgICAgICAgIHNlbGYuZGlzYWJsZUlucHV0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxmLmNoZWNrQW5zd2VyKCk7XG4gICAgICAgICAgICBhZnRlckNoZWNrLmFwcGx5KHNlbGYpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICAkaW5wdXQua2V5dXAoZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoY2hlY2tlZEFuc3dlciAhPT0gbnVsbCAmJiBjaGVja2VkQW5zd2VyICE9PSBzZWxmLmdldFVzZXJBbnN3ZXIoKSkge1xuICAgICAgICAgIC8vIFRoZSBBbnN3ZXIgaGFzIGNoYW5nZWQgc2luY2UgbGFzdCBjaGVja1xuICAgICAgICAgIGNoZWNrZWRBbnN3ZXIgPSBudWxsO1xuICAgICAgICAgICR3cmFwcGVyLnJlbW92ZUNsYXNzKCdoNXAtd3JvbmcnKTtcbiAgICAgICAgICAkaW5wdXQuYXR0cignYXJpYS1sYWJlbCcsIGlucHV0TGFiZWwpO1xuICAgICAgICAgIGlmIChhZnRlckZvY3VzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGFmdGVyRm9jdXMoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBDbG96ZSBodG1sXG4gICAgICovXG4gICAgdGhpcy50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBleHRyYSA9IGRlZmF1bHRVc2VyQW5zd2VyID8gJyB2YWx1ZT1cIicgKyBkZWZhdWx0VXNlckFuc3dlciArICdcIicgOiAnJzsgICAgICBcbiAgICAgIHZhciB0dHNCdXR0b24gPSBlbmFibGVUVFNCdXR0b25zID09PSB0cnVlID8gJzxidXR0b24gY2xhc3M9XCJoNXAtYWN0aW9uLWJ1dHRvblwiIGRhdGEtaWQ9XCInICsgdHRzSUQgKyAnXCI+WDwvYnV0dG9uPicgOiAnJztcbiAgICAgIHZhciByZXN1bHQgPSAnPHNwYW4gY2xhc3M9XCJoNXAtaW5wdXQtd3JhcHBlclwiPicgKyB0dHNCdXR0b24gKyAnPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJoNXAtdGV4dC1pbnB1dFwiIGF1dG9jb21wbGV0ZT1cIm9mZlwiIGF1dG9jYXBpdGFsaXplPVwib2ZmXCInICsgZXh0cmEgKyAnPjwvc3Bhbj4nO1xuICAgICAgc2VsZi5sZW5ndGggPSByZXN1bHQubGVuZ3RoO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMge3N0cmluZ30gVHJpbW1lZCBhbnN3ZXJcbiAgICAgKi9cbiAgICB0aGlzLmdldFVzZXJBbnN3ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gSDVQLnRyaW0oJGlucHV0LnZhbCgpKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMge3N0cmluZ30gQW5zd2VyXG4gICAgICovXG4gICAgdGhpcy5nZXRVc2VySW5wdXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gJGlucHV0LnZhbCgpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dCBOZXcgaW5wdXQgdGV4dFxuICAgICAqL1xuICAgIHRoaXMuc2V0VXNlcklucHV0ID0gZnVuY3Rpb24gKHRleHQpIHtcbiAgICAgICRpbnB1dC52YWwodGV4dCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJlc2V0cyBhcmlhIGxhYmVsIG9mIGlucHV0IGZpZWxkXG4gICAgICovXG4gICAgdGhpcy5yZXNldEFyaWFMYWJlbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICRpbnB1dC5hdHRyKCdhcmlhLWxhYmVsJywgaW5wdXRMYWJlbCk7XG4gICAgfTtcbiAgfTtcblxufSkoSDVQLmpRdWVyeSwgSDVQLkJsYW5rcyk7XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./H5P.Blanks/src/cloze.js\n");

/***/ })

/******/ });