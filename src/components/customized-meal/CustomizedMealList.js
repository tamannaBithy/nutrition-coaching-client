"use client";
import React, { useState } from "react";

import { CiCirclePlus } from "react-icons/ci";
import AllCustomizedMeal from "./AllCustomizedMeal";

const CustomizedMealList = () => {
  return (
    <div className="container">
      <div>
        <div class="row">
          <div className="col-12 col-md-6">
            <h2>select your meal</h2>

            <div>
              <h1>Day 1</h1>
              <div className="row gap-2 ">
                <div className="col border p-5">
                  <div>
                    <button
                      type="button"
                      class="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                    >
                      <CiCirclePlus />
                    </button>
                  </div>
                  <AllCustomizedMeal />
                </div>
                <div className="col border p-5">
                  <CiCirclePlus />
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6"> hi </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizedMealList;
