// this file is for the conversion of source into target based on the code snippets (provided by the mapping to codeconverter)

import express from "express";
import csv from "csv-parser";
import fs from "fs";
import bodyparser from "body-parser";
import convertor from "./convertor.mjs";
import { code_convert } from "./convertor.mjs";
import source from "./uploads/source1.json" assert { type: "json" };
import code_generator from "./convertor.mjs";
import e from "express";

var data_csv = [];
var Enumeration = {};
var target = {};
var code = "";

function evaluator(mapping_path, source_path) {
  fs.createReadStream(mapping_path)
    .pipe(csv({}))
    .on("data", (data) => {
      data_csv.push(data);
    })
    .on("end", () => {
      const code1 = code_convert(data_csv);
      code = code1;
      code1.forEach((line) => {
        eval(line);
      });
      console.log(target);
      return target;
    });
}

function sum(a, b) {
  return a + b;
}

export const output = async (req, res) => {
  console.log(req.body.source);
  var source_name = req.body.source.split("\\")[2];
  var mapping_name = req.body.mapping.split("\\")[2];

  var mapping_path = "./controllers/uploads/" + mapping_name;
  var source_path = source_name;
  evaluator(mapping_path);
  setTimeout(() => {
    var final_output = [target, code];
    console.log(final_output);
    res.json(final_output);
  }, 800);
};
