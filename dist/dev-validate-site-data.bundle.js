(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{411:function(n,e,t){"use strict";t.r(e);var r=t(373);t.d(e,"default",function(){return o});var i=new r,s=i.compile(JSON.parse('{\n  "$schema": "http://json-schema.org/draft-07/schema#",\n  "title": "SerializedSiteData",\n  "type": "object",\n  "required": [\n    "projects",\n    "technologies"\n  ],\n  "additionalProperties": false,\n  "properties": {\n    "projects": {\n      "type": "array",\n      "items": {\n        "type": "object",\n        "title": "SerializedProject",\n        "required": [\n          "name",\n          "short",\n          "technologies"\n        ],\n        "additionalProperties": false,\n        "properties": {\n          "abrv": {\n            "type": "string"\n          },\n          "name": {\n            "type": "string"\n          },\n          "urlSafeName": {\n            "type": "string"\n          },\n          "short": {\n            "type": "string"\n          },\n          "longMdUrl": {\n            "type": "string"\n          },\n          "gitUrl": {\n            "type": "string"\n          },\n          "imgUrl": {\n            "type": "string"\n          },\n          "siteUrl": {\n            "type": "string"\n          },\n          "technologies": {\n            "type": "array",\n            "items": {\n              "type": "string"\n            }\n          }\n        }\n      }\n    },\n    "technologies": {\n      "type": "array",\n      "items": {\n        "type": "object",\n        "title": "SerializedTechnology",\n        "required": [\n          "name"\n        ],\n        "additionalProperties": false,\n        "properties": {\n          "name": {\n            "type": "string"\n          },\n          "urlSafeName": {\n            "type": "string"\n          },\n          "iconName": {\n            "type": "string"\n          },\n          "short": {\n            "type": "string"\n          },\n          "longMdUrl": {\n            "type": "string"\n          },\n          "projects": {\n            "type": "array",\n            "items": {\n              "type": "string"\n            }\n          }\n        }\n      }\n    }\n  }\n}'));function o(n){if(!s(n))return i.errorsText(s.errors)}}}]);