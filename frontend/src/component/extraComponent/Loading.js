import React from "react";
import { IconContext } from "react-icons";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import "./Loading.css";
const Loading = () => {
  return (
    <div class="wrap">
      <div class="eye" id="eye1">
        <div class="eye" id="eye2">
          <div class="eye" id="eye3">
            <div class="eye" id="eye4">
              <div class="eye" id="eye5">
                <div class="eye" id="eye6">
                  <div class="eye" id="eye7">
                    <div class="eye" id="eye8"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
