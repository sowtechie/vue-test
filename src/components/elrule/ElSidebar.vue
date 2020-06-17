<template>
  <div>
    <b-row >
       <div class="sideh-container">
                <span><a href="#">Select All </a></span>
               <div class="a-container" style="padding-left: 163px;">
                   <span> <a href="#">New </a> </span>
                  <span style="padding-left: 10px;"><a href="#">Ignored </a></span>
               </div> 
               
              </div>
    </b-row>
    <b-table
      id="svsidebar"
      sticky-header
      :items="items"
      head-variant="light"
      :per-page="pageSize"
      :current-page="currentPage"
      :show-empty="true"
      ref="selectableTable"
      selectable
      :select-mode="selectMode"
      :fields="fields"
      @row-selected="onRowSelected"
      responsive="sm"
    >
      <template v-slot:cell(selected)="{ rowSelected }">
        <template v-if="rowSelected">
          <span aria-hidden="true">&check;</span>
          <span class="sr-only">Selected</span>
        </template>
        <template v-else>
          <span aria-hidden="true">&nbsp;</span>
          <span class="sr-only">Not selected</span>
        </template>
      </template>
      <template v-slot:cell(rule_uri)="row">
        <div class="s-container">
          <div class="s-box2">
            <div>
              <span>
                <i class="fa fa-globe nw-ping-cue"></i>
              </span>
              <span class="space-left">{{row.item.created_last}}</span>
            </div>
            <div>
              <span>
                <i class="fa fa-edit nw-edge-cue"></i>
              </span>
              <span class="space-left">{{row.item.rule_uri}}</span>
            </div>
          </div>
        </div>
      </template>
    </b-table>

    <b-row>
      <b-col class="col-8">
        <b-pagination
          :total-rows="filteredOrigins.length"
          v-model="currentPage"
          :per-page="pageSize"
          :hide-goto-end-buttons="true"
          size="sm"
          align="right"
        />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from "axios";
import config from "config";
export default {
  data() {
    return {
      //api
      svcol: null,
      //api..
      svpointer: null,
      total: 0,
      next: null,
      pageSize: 5,
      currentPage: 1,

      modes: ["multi", "single", "range"],
      fields: [
        { label: "Sel", key: "selected" },
        { label: "        New Ignored", key: "rule_uri" }
      ],
      items: [
        {
          is_selected: false,
          rule_uri: "https://mtom.com/xmlUri/ge",
          generalHeaders: {
            url: "https://mtom.com/xmlUri/ge",
            method: "PostmanRuntime/7.25.0",
            statusCode: "localhost:9005",

            remoteAddress: "https://www.verizon.com/home/phone1/",
            referralPolicy: "no referral"
          },
          responseHeaders: {
            accept: "*/*",
            "user-agent": "Vwz/7.25.0",
            host: "localhost:9005",
            "timeout-access": "<function1>",
            cookie:
              "ECOMM_SESSION=eyJhbGciOiJIUzI1NiJ9.eyJkYXRhIjp7ImFwcE5hbWUiOiJlY29tbV9zdG9yZV9wcm9zcGVjdCIsIlJFRkVSRVJfVVJMIjoiL3Byb3NwZWN0L3RlYWxlYWZUYXJnZXQiLCJjc3BOb25jZSI6IjNhNzc4NTg1MzM2ZDViYzJlOTc3MWY3MDcxYmRkMWI0ZjMzNThlN2I4MWUzMzk0MWUwYTJiMjg4ODE1ZjU1MzQiLCJwbGF5U2Vzc2lvbiI6IlBPVC1ELWIwN2Q1MzBiLTU5NDEtNDVmNy04YjhmLWI5YjdhMWMxYzQ5YXtzNH0iLCJDb3JyZWxhdGlvbklkIjoiT05FRElHSVRBTC0xMDZhYjkxNy1mNGFjLTQyODEtODM5ZS1kMTVjYzA5OTQyNmQtVC0xNTg4NjQ4OTYxNjEwIn0sIm5iZiI6MTU4ODY0ODk2MSwiaWF0IjoxNTg4NjQ4OTYxfQ.jJhfEty9jzNrVtZXMU5yc2JKNQA_Y2Yei1a9QK-UoC4; GlobalSessionID=sfasdfasdf65765676fsadfas7f678sdf; billingId=Sanjeev",
            "postman-token": "0d40cbae-a0b2-4f9b-83a2-317cdd2f6ce3",
            "x-origin-path": "/jsonUri1/",
            connection: "keep-alive",
            "x-forwarded-for": "10.20.216.50",
            "x-custom-hdr": "Custom Header 1",
            "accept-encoding": "gzip, deflate, br"
          },
          created_last: "10/4 10:00 AM"
        },
        {
          is_selected: false,
          rule_uri: "https://mtom.com/dmUri/",
          generalHeaders: {
            url: "https://mtom.com/dmUri/",
            method: "post",
            statusCode: "vwsz:9007",

            remoteAddress: "https://www.verizon.com/home/phone/2",
            referralPolicy: "no referral"
          },
          responseHeaders: {
            accept: "*/*",
            "user-agent": "vwz/7.25.1",
            host: "localhost:9005",
            "timeout-access": "<function1>",
            cookie:
              "ECOMM_SESSION=eyJhbGciOiJIUzI1NiJ9.eyJkYXRhIjp7ImFwcE5hbWUiOiJlY29tbV9zdG9yZV9wcm9zcGVjdCIsIlJFRkVSRVJfVVJMIjoiL3Byb3NwZWN0L3RlYWxlYWZUYXJnZXQiLCJjc3BOb25jZSI6IjNhNzc4NTg1MzM2ZDViYzJlOTc3MWY3MDcxYmRkMWI0ZjMzNThlN2I4MWUzMzk0MWUwYTJiMjg4ODE1ZjU1MzQiLCJwbGF5U2Vzc2lvbiI6IlBPVC1ELWIwN2Q1MzBiLTU5NDEtNDVmNy04YjhmLWI5YjdhMWMxYzQ5YXtzNH0iLCJDb3JyZWxhdGlvbklkIjoiT05FRElHSVRBTC0xMDZhYjkxNy1mNGFjLTQyODEtODM5ZS1kMTVjYzA5OTQyNmQtVC0xNTg4NjQ4OTYxNjEwIn0sIm5iZiI6MTU4ODY0ODk2MSwiaWF0IjoxNTg4NjQ4OTYxfQ.jJhfEty9jzNrVtZXMU5yc2JKNQA_Y2Yei1a9QK-UoC4; GlobalSessionID=sfasdfasdf65765676fsadfas7f678sdf; billingId=Sanjeev",
            "postman-token": "0d40cbae-a0b2-4f9b-83a2-317cdd2f6ce3",
            "x-origin-path": "/jsonUri1/",
            connection: "keep-alive",
            "x-forwarded-for": "10.20.216.50",
            "x-custom-hdr": "Custom Header 1",
            "accept-encoding": "gzip, deflate, br"
          },
          created_last: "10/6 12:00 AM"
        },
        {
          is_selected: false,
          rule_uri: "https://mtom.com/netflixUri/",
          generalHeaders: {
            url: "https://mtom.com/netflixUri/",
            method: "PostmanRuntime/7.25.0",
            statusCode: "localhost:9005",

            remoteAddress: "https://www.verizon.com/home/phone/",
            referralPolicy: "no referral"
          },
          responseHeaders: {
            accept: "*/*",
            "user-agent": "google/8.39.0",
            host: "localhost:9005",
            "timeout-access": "<function1>",
            cookie:
              "ECOMM_SESSION=eyJhbGciOiJIUzI1NiJ9.eyJkYXRhIjp7ImFwcE5hbWUiOiJlY29tbV9zdG9yZV9wcm9zcGVjdCIsIlJFRkVSRVJfVVJMIjoiL3Byb3NwZWN0L3RlYWxlYWZUYXJnZXQiLCJjc3BOb25jZSI6IjNhNzc4NTg1MzM2ZDViYzJlOTc3MWY3MDcxYmRkMWI0ZjMzNThlN2I4MWUzMzk0MWUwYTJiMjg4ODE1ZjU1MzQiLCJwbGF5U2Vzc2lvbiI6IlBPVC1ELWIwN2Q1MzBiLTU5NDEtNDVmNy04YjhmLWI5YjdhMWMxYzQ5YXtzNH0iLCJDb3JyZWxhdGlvbklkIjoiT05FRElHSVRBTC0xMDZhYjkxNy1mNGFjLTQyODEtODM5ZS1kMTVjYzA5OTQyNmQtVC0xNTg4NjQ4OTYxNjEwIn0sIm5iZiI6MTU4ODY0ODk2MSwiaWF0IjoxNTg4NjQ4OTYxfQ.jJhfEty9jzNrVtZXMU5yc2JKNQA_Y2Yei1a9QK-UoC4; GlobalSessionID=sfasdfasdf65765676fsadfas7f678sdf; billingId=Sanjeev",
            "postman-token": "0d40cbae-a0b2-4f9b-83a2-317cdd2f6ce3",
            "x-origin-path": "/jsonUri1/",
            connection: "keep-alive",
            "x-forwarded-for": "10.20.216.50",
            "x-custom-hdr": "Custom Header 1",
            "accept-encoding": "gzip, deflate, br"
          },
          created_last: "14/8 10:00 AM"
        },
        {
          is_selected: false,
          rule_uri: "https://netor.com/catUri/",
          generalHeaders: {
            url: "https://mtom.com/netflixUri/",
            method: "mrt/8.25.0",
            statusCode: "localhost:9005",

            remoteAddress: "https://www.verizon.com/home/phone/",
            referralPolicy: "no referral"
          },
          responseHeaders: {
            accept: "*/*",
            "user-agent": "PostmanRuntime/7.25.0",
            host: "localhost:9005",
            "timeout-access": "<function1>",
            cookie:
              "ECOMM_SESSION=eyJhbGciOiJIUzI1NiJ9.eyJkYXRhIjp7ImFwcE5hbWUiOiJlY29tbV9zdG9yZV9wcm9zcGVjdCIsIlJFRkVSRVJfVVJMIjoiL3Byb3NwZWN0L3RlYWxlYWZUYXJnZXQiLCJjc3BOb25jZSI6IjNhNzc4NTg1MzM2ZDViYzJlOTc3MWY3MDcxYmRkMWI0ZjMzNThlN2I4MWUzMzk0MWUwYTJiMjg4ODE1ZjU1MzQiLCJwbGF5U2Vzc2lvbiI6IlBPVC1ELWIwN2Q1MzBiLTU5NDEtNDVmNy04YjhmLWI5YjdhMWMxYzQ5YXtzNH0iLCJDb3JyZWxhdGlvbklkIjoiT05FRElHSVRBTC0xMDZhYjkxNy1mNGFjLTQyODEtODM5ZS1kMTVjYzA5OTQyNmQtVC0xNTg4NjQ4OTYxNjEwIn0sIm5iZiI6MTU4ODY0ODk2MSwiaWF0IjoxNTg4NjQ4OTYxfQ.jJhfEty9jzNrVtZXMU5yc2JKNQA_Y2Yei1a9QK-UoC4; GlobalSessionID=sfasdfasdf65765676fsadfas7f678sdf; billingId=Sanjeev",
            "postman-token": "0d40cbae-a0b2-4f9b-83a2-317cdd2f6ce3",
            "x-origin-path": "/jsonUri1/",
            connection: "keep-alive",
            "x-forwarded-for": "10.20.216.50",
            "x-custom-hdr": "Custom Header 1",
            "accept-encoding": "gzip, deflate, br"
          },
          created_last: "16/10 10:00 AM"
        },
        {
          is_selected: false,
          rule_uri: "https://nginx.com/catUri/",
          generalHeaders: {
            url: "https://nginx.com/catUri/",
            method: "PostmanRuntime/7.25.0",
            statusCode: "localhost:9005",

            remoteAddress: "https://www.verizon.com/home/phone/",
            referralPolicy: "no referral"
          },
          responseHeaders: {
            accept: "*/*",
            "user-agent": "PostmanRuntime/7.25.0",
            host: "localhost:9005",
            "timeout-access": "<function1>",
            cookie:
              "ECOMM_SESSION=eyJhbGciOiJIUzI1NiJ9.eyJkYXRhIjp7ImFwcE5hbWUiOiJlY29tbV9zdG9yZV9wcm9zcGVjdCIsIlJFRkVSRVJfVVJMIjoiL3Byb3NwZWN0L3RlYWxlYWZUYXJnZXQiLCJjc3BOb25jZSI6IjNhNzc4NTg1MzM2ZDViYzJlOTc3MWY3MDcxYmRkMWI0ZjMzNThlN2I4MWUzMzk0MWUwYTJiMjg4ODE1ZjU1MzQiLCJwbGF5U2Vzc2lvbiI6IlBPVC1ELWIwN2Q1MzBiLTU5NDEtNDVmNy04YjhmLWI5YjdhMWMxYzQ5YXtzNH0iLCJDb3JyZWxhdGlvbklkIjoiT05FRElHSVRBTC0xMDZhYjkxNy1mNGFjLTQyODEtODM5ZS1kMTVjYzA5OTQyNmQtVC0xNTg4NjQ4OTYxNjEwIn0sIm5iZiI6MTU4ODY0ODk2MSwiaWF0IjoxNTg4NjQ4OTYxfQ.jJhfEty9jzNrVtZXMU5yc2JKNQA_Y2Yei1a9QK-UoC4; GlobalSessionID=sfasdfasdf65765676fsadfas7f678sdf; billingId=Sanjeev",
            "postman-token": "0d40cbae-a0b2-4f9b-83a2-317cdd2f6ce3",
            "x-origin-path": "/jsonUri1/",
            connection: "keep-alive",
            "x-forwarded-for": "10.20.216.50",
            "x-custom-hdr": "Custom Header 1",
            "accept-encoding": "gzip, deflate, br"
          },
          created_last: "18/10 10:00 AM"
        },
        {
          is_selected: false,
          rule_uri: "https://nginx2.com/catUri/",
          generalHeaders: {
            url: "https://nginx2.com/catUri/",
            method: "PostmanRuntime/7.25.0",
            statusCode: "localhost:9005",

            remoteAddress: "https://www.verizon.com/home/phone/",
            referralPolicy: "no referral"
          },
          responseHeaders: {
            accept: "*/*",
            "user-agent": "PostmanRuntime/7.25.0",
            host: "localhost:9005",
            "timeout-access": "<function1>",
            cookie:
              "ECOMM_SESSION=eyJhbGciOiJIUzI1NiJ9.eyJkYXRhIjp7ImFwcE5hbWUiOiJlY29tbV9zdG9yZV9wcm9zcGVjdCIsIlJFRkVSRVJfVVJMIjoiL3Byb3NwZWN0L3RlYWxlYWZUYXJnZXQiLCJjc3BOb25jZSI6IjNhNzc4NTg1MzM2ZDViYzJlOTc3MWY3MDcxYmRkMWI0ZjMzNThlN2I4MWUzMzk0MWUwYTJiMjg4ODE1ZjU1MzQiLCJwbGF5U2Vzc2lvbiI6IlBPVC1ELWIwN2Q1MzBiLTU5NDEtNDVmNy04YjhmLWI5YjdhMWMxYzQ5YXtzNH0iLCJDb3JyZWxhdGlvbklkIjoiT05FRElHSVRBTC0xMDZhYjkxNy1mNGFjLTQyODEtODM5ZS1kMTVjYzA5OTQyNmQtVC0xNTg4NjQ4OTYxNjEwIn0sIm5iZiI6MTU4ODY0ODk2MSwiaWF0IjoxNTg4NjQ4OTYxfQ.jJhfEty9jzNrVtZXMU5yc2JKNQA_Y2Yei1a9QK-UoC4; GlobalSessionID=sfasdfasdf65765676fsadfas7f678sdf; billingId=Sanjeev",
            "postman-token": "0d40cbae-a0b2-4f9b-83a2-317cdd2f6ce3",
            "x-origin-path": "/jsonUri1/",
            connection: "keep-alive",
            "x-forwarded-for": "10.20.216.50",
            "x-custom-hdr": "Custom Header 1",
            "accept-encoding": "gzip, deflate, br"
          },

          created_last: "20/10 10:00 AM"
        },
        {
          is_selected: false,
          rule_uri: "https://nginx3.com/catUri/",
          generalHeaders: {
            url: "https://nginx3.com/catUri/",
            method: "PostmanRuntime/7.25.0",
            statusCode: "vxre:9005",

            remoteAddress: "https://www.verizon.com/home/phone/6",
            referralPolicy: "no referral"
          },
          responseHeaders: {
            accept: "*/*",
            "user-agent": "PostmanRuntime/7.25.0",
            host: "localhost:9005",
            "timeout-access": "<function1>",
            cookie:
              "ECOMM_SESSION=eyJhbGciOiJIUzI1NiJ9.eyJkYXRhIjp7ImFwcE5hbWUiOiJlY29tbV9zdG9yZV9wcm9zcGVjdCIsIlJFRkVSRVJfVVJMIjoiL3Byb3NwZWN0L3RlYWxlYWZUYXJnZXQiLCJjc3BOb25jZSI6IjNhNzc4NTg1MzM2ZDViYzJlOTc3MWY3MDcxYmRkMWI0ZjMzNThlN2I4MWUzMzk0MWUwYTJiMjg4ODE1ZjU1MzQiLCJwbGF5U2Vzc2lvbiI6IlBPVC1ELWIwN2Q1MzBiLTU5NDEtNDVmNy04YjhmLWI5YjdhMWMxYzQ5YXtzNH0iLCJDb3JyZWxhdGlvbklkIjoiT05FRElHSVRBTC0xMDZhYjkxNy1mNGFjLTQyODEtODM5ZS1kMTVjYzA5OTQyNmQtVC0xNTg4NjQ4OTYxNjEwIn0sIm5iZiI6MTU4ODY0ODk2MSwiaWF0IjoxNTg4NjQ4OTYxfQ.jJhfEty9jzNrVtZXMU5yc2JKNQA_Y2Yei1a9QK-UoC4; GlobalSessionID=sfasdfasdf65765676fsadfas7f678sdf; billingId=Sanjeev",
            "postman-token": "0d40cbae-a0b2-4f9b-83a2-317cdd2f6ce3",
            "x-origin-path": "/jsonUri1/",
            connection: "keep-alive",
            "x-forwarded-for": "10.20.216.50",
            "x-custom-hdr": "Custom Header 1",
            "accept-encoding": "gzip, deflate, br"
          },
          created_last: "22/10 10:00 AM"
        },
        {
          is_selected: false,
          rule_uri: "https://nginx4.com/catUri/",
          generalHeaders: {
            url: "https://nginx4.com/catUri/",
            method: "PostmanRuntime/7.25.0",
            statusCode: "localhost:9005",

            remoteAddress: "https://www.verizon.com/home/phone/7",
            referralPolicy: "no referral"
          },
          responseHeaders: {
            accept: "*/*",
            "user-agent": "PostmanRuntime/7.25.0",
            host: "localhost:9005",
            "timeout-access": "<function1>",
            cookie:
              "ECOMM_SESSION=eyJhbGciOiJIUzI1NiJ9.eyJkYXRhIjp7ImFwcE5hbWUiOiJlY29tbV9zdG9yZV9wcm9zcGVjdCIsIlJFRkVSRVJfVVJMIjoiL3Byb3NwZWN0L3RlYWxlYWZUYXJnZXQiLCJjc3BOb25jZSI6IjNhNzc4NTg1MzM2ZDViYzJlOTc3MWY3MDcxYmRkMWI0ZjMzNThlN2I4MWUzMzk0MWUwYTJiMjg4ODE1ZjU1MzQiLCJwbGF5U2Vzc2lvbiI6IlBPVC1ELWIwN2Q1MzBiLTU5NDEtNDVmNy04YjhmLWI5YjdhMWMxYzQ5YXtzNH0iLCJDb3JyZWxhdGlvbklkIjoiT05FRElHSVRBTC0xMDZhYjkxNy1mNGFjLTQyODEtODM5ZS1kMTVjYzA5OTQyNmQtVC0xNTg4NjQ4OTYxNjEwIn0sIm5iZiI6MTU4ODY0ODk2MSwiaWF0IjoxNTg4NjQ4OTYxfQ.jJhfEty9jzNrVtZXMU5yc2JKNQA_Y2Yei1a9QK-UoC4; GlobalSessionID=sfasdfasdf65765676fsadfas7f678sdf; billingId=Sanjeev",
            "postman-token": "0d40cbae-a0b2-4f9b-83a2-317cdd2f6ce3",
            "x-origin-path": "/jsonUri1/",
            connection: "keep-alive",
            "x-forwarded-for": "10.20.216.50",
            "x-custom-hdr": "Custom Header 1",
            "accept-encoding": "gzip, deflate, br"
          },
          created_last: "23/10 10:00 AM"
        },
        {
          is_selected: false,
          rule_uri: "https://nginx5.com/catUri/",
          generalHeaders: {
            url: "https://nginx5.com/catUri/",
            method: "PostmanRuntime/7.25.0",
            statusCode: "200",

            remoteAddress: "https://www.verizon.com/home/phone/8",
            referralPolicy: "no referral"
          },
          responseHeaders: {
            accept: "*/*",
            "user-agent": "PostmanRuntime/7.25.0",
            host: "localhost:9005",
            "timeout-access": "<function1>",
            cookie:
              "ECOMM_SESSION=eyJhbGciOiJIUzI1NiJ9.eyJkYXRhIjp7ImFwcE5hbWUiOiJlY29tbV9zdG9yZV9wcm9zcGVjdCIsIlJFRkVSRVJfVVJMIjoiL3Byb3NwZWN0L3RlYWxlYWZUYXJnZXQiLCJjc3BOb25jZSI6IjNhNzc4NTg1MzM2ZDViYzJlOTc3MWY3MDcxYmRkMWI0ZjMzNThlN2I4MWUzMzk0MWUwYTJiMjg4ODE1ZjU1MzQiLCJwbGF5U2Vzc2lvbiI6IlBPVC1ELWIwN2Q1MzBiLTU5NDEtNDVmNy04YjhmLWI5YjdhMWMxYzQ5YXtzNH0iLCJDb3JyZWxhdGlvbklkIjoiT05FRElHSVRBTC0xMDZhYjkxNy1mNGFjLTQyODEtODM5ZS1kMTVjYzA5OTQyNmQtVC0xNTg4NjQ4OTYxNjEwIn0sIm5iZiI6MTU4ODY0ODk2MSwiaWF0IjoxNTg4NjQ4OTYxfQ.jJhfEty9jzNrVtZXMU5yc2JKNQA_Y2Yei1a9QK-UoC4; GlobalSessionID=sfasdfasdf65765676fsadfas7f678sdf; billingId=Sanjeev",
            "postman-token": "0d40cbae-a0b2-4f9b-83a2-317cdd2f6ce3",
            "x-origin-path": "/jsonUri1/",
            connection: "keep-alive",
            "x-forwarded-for": "10.20.216.50",
            "x-custom-hdr": "Custom Header 1",
            "accept-encoding": "gzip, deflate, br"
          },
          created_last: "24/10 10:00 AM"
        },
        {
          is_selected: false,
          rule_uri: "https://nginx6.com/catUri/",
          generalHeaders: {
            url: "https://nginx6.com/catUri/",
            method: "PostmanRuntime/7.25.0",
            statusCode: "localhost:9005",

            remoteAddress: "https://www.verizon.com/home/phone/7",
            referralPolicy: "no referral"
          },
          responseHeaders: {
            accept: "*/*",
            "user-agent": "PostmanRuntime/7.25.0",
            host: "localhost:9005",
            "timeout-access": "<function1>",
            cookie:
              "ECOMM_SESSION=eyJhbGciOiJIUzI1NiJ9.eyJkYXRhIjp7ImFwcE5hbWUiOiJlY29tbV9zdG9yZV9wcm9zcGVjdCIsIlJFRkVSRVJfVVJMIjoiL3Byb3NwZWN0L3RlYWxlYWZUYXJnZXQiLCJjc3BOb25jZSI6IjNhNzc4NTg1MzM2ZDViYzJlOTc3MWY3MDcxYmRkMWI0ZjMzNThlN2I4MWUzMzk0MWUwYTJiMjg4ODE1ZjU1MzQiLCJwbGF5U2Vzc2lvbiI6IlBPVC1ELWIwN2Q1MzBiLTU5NDEtNDVmNy04YjhmLWI5YjdhMWMxYzQ5YXtzNH0iLCJDb3JyZWxhdGlvbklkIjoiT05FRElHSVRBTC0xMDZhYjkxNy1mNGFjLTQyODEtODM5ZS1kMTVjYzA5OTQyNmQtVC0xNTg4NjQ4OTYxNjEwIn0sIm5iZiI6MTU4ODY0ODk2MSwiaWF0IjoxNTg4NjQ4OTYxfQ.jJhfEty9jzNrVtZXMU5yc2JKNQA_Y2Yei1a9QK-UoC4; GlobalSessionID=sfasdfasdf65765676fsadfas7f678sdf; billingId=Sanjeev",
            "postman-token": "0d40cbae-a0b2-4f9b-83a2-317cdd2f6ce3",
            "x-origin-path": "/jsonUri1/",
            connection: "keep-alive",
            "x-forwarded-for": "10.20.216.50",
            "x-custom-hdr": "Custom Header 1",
            "accept-encoding": "gzip, deflate, br"
          },
          created_last: "25/10 10:00 AM"
        },
        {
          is_selected: false,
          rule_uri: "https://sun.com/catUri/",
          generalHeaders: {
            url: "https://sun.com/catUri/",
            method: "PostmanRuntime/7.25.0",
            statusCode: "localhost:9005",

            remoteAddress: "https://www.verizon.com/home/phone/",
            referralPolicy: "no referral"
          },
          responseHeaders: {
            accept: "*/*",
            "user-agent": "PostmanRuntime/7.25.0",
            host: "localhost:9005",
            "timeout-access": "<function1>",
            cookie:
              "ECOMM_SESSION=eyJhbGciOiJIUzI1NiJ9.eyJkYXRhIjp7ImFwcE5hbWUiOiJlY29tbV9zdG9yZV9wcm9zcGVjdCIsIlJFRkVSRVJfVVJMIjoiL3Byb3NwZWN0L3RlYWxlYWZUYXJnZXQiLCJjc3BOb25jZSI6IjNhNzc4NTg1MzM2ZDViYzJlOTc3MWY3MDcxYmRkMWI0ZjMzNThlN2I4MWUzMzk0MWUwYTJiMjg4ODE1ZjU1MzQiLCJwbGF5U2Vzc2lvbiI6IlBPVC1ELWIwN2Q1MzBiLTU5NDEtNDVmNy04YjhmLWI5YjdhMWMxYzQ5YXtzNH0iLCJDb3JyZWxhdGlvbklkIjoiT05FRElHSVRBTC0xMDZhYjkxNy1mNGFjLTQyODEtODM5ZS1kMTVjYzA5OTQyNmQtVC0xNTg4NjQ4OTYxNjEwIn0sIm5iZiI6MTU4ODY0ODk2MSwiaWF0IjoxNTg4NjQ4OTYxfQ.jJhfEty9jzNrVtZXMU5yc2JKNQA_Y2Yei1a9QK-UoC4; GlobalSessionID=sfasdfasdf65765676fsadfas7f678sdf; billingId=Sanjeev",
            "postman-token": "0d40cbae-a0b2-4f9b-83a2-317cdd2f6ce3",
            "x-origin-path": "/jsonUri1/",
            connection: "keep-alive",
            "x-forwarded-for": "10.20.216.50",
            "x-custom-hdr": "Custom Header 1",
            "accept-encoding": "gzip, deflate, br"
          },
          created_last: "26/10 10:00 AM"
        },
        {
          is_selected: false,
          rule_uri: "https://google.com/catUri/",
          generalHeaders: {
            url: "https://google.com/catUri/",
            method: "PostmanRuntime/7.25.0",
            statusCode: "localhost:9005",

            remoteAddress: "https://www.verizon.com/home/phone/",
            referralPolicy: "no referral"
          },
          responseHeaders: {
            accept: "*/*",
            "user-agent": "PostmanRuntime/7.25.0",
            host: "localhost:9005",
            "timeout-access": "<function1>",
            cookie:
              "ECOMM_SESSION=eyJhbGciOiJIUzI1NiJ9.eyJkYXRhIjp7ImFwcE5hbWUiOiJlY29tbV9zdG9yZV9wcm9zcGVjdCIsIlJFRkVSRVJfVVJMIjoiL3Byb3NwZWN0L3RlYWxlYWZUYXJnZXQiLCJjc3BOb25jZSI6IjNhNzc4NTg1MzM2ZDViYzJlOTc3MWY3MDcxYmRkMWI0ZjMzNThlN2I4MWUzMzk0MWUwYTJiMjg4ODE1ZjU1MzQiLCJwbGF5U2Vzc2lvbiI6IlBPVC1ELWIwN2Q1MzBiLTU5NDEtNDVmNy04YjhmLWI5YjdhMWMxYzQ5YXtzNH0iLCJDb3JyZWxhdGlvbklkIjoiT05FRElHSVRBTC0xMDZhYjkxNy1mNGFjLTQyODEtODM5ZS1kMTVjYzA5OTQyNmQtVC0xNTg4NjQ4OTYxNjEwIn0sIm5iZiI6MTU4ODY0ODk2MSwiaWF0IjoxNTg4NjQ4OTYxfQ.jJhfEty9jzNrVtZXMU5yc2JKNQA_Y2Yei1a9QK-UoC4; GlobalSessionID=sfasdfasdf65765676fsadfas7f678sdf; billingId=Sanjeev",
            "postman-token": "0d40cbae-a0b2-4f9b-83a2-317cdd2f6ce3",
            "x-origin-path": "/jsonUri1/",
            connection: "keep-alive",
            "x-forwarded-for": "10.20.216.50",
            "x-custom-hdr": "Custom Header 1",
            "accept-encoding": "gzip, deflate, br"
          },

          created_last: "27/10 10:00 AM"
        },
        {
          is_selected: false,
          rule_uri: "https://gman.com/catUri/",
          generalHeaders: {
            url: "https://gman.com/catUri/",
            method: "PostmanRuntime/7.25.0",
            statusCode: "localhost:9005",

            remoteAddress: "https://www.verizon.com/home/phone/",
            referralPolicy: "no referral"
          },
          responseHeaders: {
            accept: "*/*",
            "user-agent": "PostmanRuntime/7.25.0",
            host: "localhost:9005",
            "timeout-access": "<function1>",
            cookie:
              "ECOMM_SESSION=eyJhbGciOiJIUzI1NiJ9.eyJkYXRhIjp7ImFwcE5hbWUiOiJlY29tbV9zdG9yZV9wcm9zcGVjdCIsIlJFRkVSRVJfVVJMIjoiL3Byb3NwZWN0L3RlYWxlYWZUYXJnZXQiLCJjc3BOb25jZSI6IjNhNzc4NTg1MzM2ZDViYzJlOTc3MWY3MDcxYmRkMWI0ZjMzNThlN2I4MWUzMzk0MWUwYTJiMjg4ODE1ZjU1MzQiLCJwbGF5U2Vzc2lvbiI6IlBPVC1ELWIwN2Q1MzBiLTU5NDEtNDVmNy04YjhmLWI5YjdhMWMxYzQ5YXtzNH0iLCJDb3JyZWxhdGlvbklkIjoiT05FRElHSVRBTC0xMDZhYjkxNy1mNGFjLTQyODEtODM5ZS1kMTVjYzA5OTQyNmQtVC0xNTg4NjQ4OTYxNjEwIn0sIm5iZiI6MTU4ODY0ODk2MSwiaWF0IjoxNTg4NjQ4OTYxfQ.jJhfEty9jzNrVtZXMU5yc2JKNQA_Y2Yei1a9QK-UoC4; GlobalSessionID=sfasdfasdf65765676fsadfas7f678sdf; billingId=Sanjeev",
            "postman-token": "0d40cbae-a0b2-4f9b-83a2-317cdd2f6ce3",
            "x-origin-path": "/jsonUri1/",
            connection: "keep-alive",
            "x-forwarded-for": "10.20.216.50",
            "x-custom-hdr": "Custom Header 1",
            "accept-encoding": "gzip, deflate, br"
          },

          created_last: "28/10 10:00 AM"
        },
        {
          is_selected: false,
          rule_uri: "https://gtom.com/catUri/",
          generalHeaders: {
            url: "https://gtom.com/catUri/",
            method: "PostmanRuntime/7.25.0",
            statusCode: "localhost:9005",

            remoteAddress: "https://www.verizon.com/home/phone/",
            referralPolicy: "no referral"
          },
          responseHeaders: {
            accept: "*/*",
            "user-agent": "PostmanRuntime/7.25.0",
            host: "localhost:9005",
            "timeout-access": "<function1>",
            cookie:
              "ECOMM_SESSION=eyJhbGciOiJIUzI1NiJ9.eyJkYXRhIjp7ImFwcE5hbWUiOiJlY29tbV9zdG9yZV9wcm9zcGVjdCIsIlJFRkVSRVJfVVJMIjoiL3Byb3NwZWN0L3RlYWxlYWZUYXJnZXQiLCJjc3BOb25jZSI6IjNhNzc4NTg1MzM2ZDViYzJlOTc3MWY3MDcxYmRkMWI0ZjMzNThlN2I4MWUzMzk0MWUwYTJiMjg4ODE1ZjU1MzQiLCJwbGF5U2Vzc2lvbiI6IlBPVC1ELWIwN2Q1MzBiLTU5NDEtNDVmNy04YjhmLWI5YjdhMWMxYzQ5YXtzNH0iLCJDb3JyZWxhdGlvbklkIjoiT05FRElHSVRBTC0xMDZhYjkxNy1mNGFjLTQyODEtODM5ZS1kMTVjYzA5OTQyNmQtVC0xNTg4NjQ4OTYxNjEwIn0sIm5iZiI6MTU4ODY0ODk2MSwiaWF0IjoxNTg4NjQ4OTYxfQ.jJhfEty9jzNrVtZXMU5yc2JKNQA_Y2Yei1a9QK-UoC4; GlobalSessionID=sfasdfasdf65765676fsadfas7f678sdf; billingId=Sanjeev",
            "postman-token": "0d40cbae-a0b2-4f9b-83a2-317cdd2f6ce3",
            "x-origin-path": "/jsonUri1/",
            connection: "keep-alive",
            "x-forwarded-for": "10.20.216.50",
            "x-custom-hdr": "Custom Header 1",
            "accept-encoding": "gzip, deflate, br"
          },

          created_last: "29/10 10:00 AM"
        },
        {
          is_selected: false,
          rule_uri: "https://gtom.com/catUri/",
          generalHeaders: {
            url: "https://gtom.com/catUri/",
            method: "PostmanRuntime/7.25.0",
            statusCode: "localhost:9005",

            remoteAddress: "https://www.verizon.com/home/phone/",
            referralPolicy: "no referral"
          },
          responseHeaders: {
            accept: "*/*",
            "user-agent": "PostmanRuntime/7.25.0",
            host: "localhost:9005",
            "timeout-access": "<function1>",
            cookie:
              "ECOMM_SESSION=eyJhbGciOiJIUzI1NiJ9.eyJkYXRhIjp7ImFwcE5hbWUiOiJlY29tbV9zdG9yZV9wcm9zcGVjdCIsIlJFRkVSRVJfVVJMIjoiL3Byb3NwZWN0L3RlYWxlYWZUYXJnZXQiLCJjc3BOb25jZSI6IjNhNzc4NTg1MzM2ZDViYzJlOTc3MWY3MDcxYmRkMWI0ZjMzNThlN2I4MWUzMzk0MWUwYTJiMjg4ODE1ZjU1MzQiLCJwbGF5U2Vzc2lvbiI6IlBPVC1ELWIwN2Q1MzBiLTU5NDEtNDVmNy04YjhmLWI5YjdhMWMxYzQ5YXtzNH0iLCJDb3JyZWxhdGlvbklkIjoiT05FRElHSVRBTC0xMDZhYjkxNy1mNGFjLTQyODEtODM5ZS1kMTVjYzA5OTQyNmQtVC0xNTg4NjQ4OTYxNjEwIn0sIm5iZiI6MTU4ODY0ODk2MSwiaWF0IjoxNTg4NjQ4OTYxfQ.jJhfEty9jzNrVtZXMU5yc2JKNQA_Y2Yei1a9QK-UoC4; GlobalSessionID=sfasdfasdf65765676fsadfas7f678sdf; billingId=Sanjeev",
            "postman-token": "0d40cbae-a0b2-4f9b-83a2-317cdd2f6ce3",
            "x-origin-path": "/jsonUri1/",
            connection: "keep-alive",
            "x-forwarded-for": "10.20.216.50",
            "x-custom-hdr": "Custom Header 1",
            "accept-encoding": "gzip, deflate, br"
          },

          created_last: "02/11 10:00 AM"
        },
        {
          is_selected: false,
          rule_uri: "https://gtom.com/catUri/",
          generalHeaders: {
            url: "https://gtom.com/catUri/",
            method: "PostmanRuntime/7.25.0",
            statusCode: "localhost:9005",

            remoteAddress: "https://www.verizon.com/home/phone/",
            referralPolicy: "no referral"
          },
          responseHeaders: {
            accept: "*/*",
            "user-agent": "PostmanRuntime/7.25.0",
            host: "localhost:9005",
            "timeout-access": "<function1>",
            cookie:
              "ECOMM_SESSION=eyJhbGciOiJIUzI1NiJ9.eyJkYXRhIjp7ImFwcE5hbWUiOiJlY29tbV9zdG9yZV9wcm9zcGVjdCIsIlJFRkVSRVJfVVJMIjoiL3Byb3NwZWN0L3RlYWxlYWZUYXJnZXQiLCJjc3BOb25jZSI6IjNhNzc4NTg1MzM2ZDViYzJlOTc3MWY3MDcxYmRkMWI0ZjMzNThlN2I4MWUzMzk0MWUwYTJiMjg4ODE1ZjU1MzQiLCJwbGF5U2Vzc2lvbiI6IlBPVC1ELWIwN2Q1MzBiLTU5NDEtNDVmNy04YjhmLWI5YjdhMWMxYzQ5YXtzNH0iLCJDb3JyZWxhdGlvbklkIjoiT05FRElHSVRBTC0xMDZhYjkxNy1mNGFjLTQyODEtODM5ZS1kMTVjYzA5OTQyNmQtVC0xNTg4NjQ4OTYxNjEwIn0sIm5iZiI6MTU4ODY0ODk2MSwiaWF0IjoxNTg4NjQ4OTYxfQ.jJhfEty9jzNrVtZXMU5yc2JKNQA_Y2Yei1a9QK-UoC4; GlobalSessionID=sfasdfasdf65765676fsadfas7f678sdf; billingId=Sanjeev",
            "postman-token": "0d40cbae-a0b2-4f9b-83a2-317cdd2f6ce3",
            "x-origin-path": "/jsonUri1/",
            connection: "keep-alive",
            "x-forwarded-for": "10.20.216.50",
            "x-custom-hdr": "Custom Header 1",
            "accept-encoding": "gzip, deflate, br"
          },

          created_last: "04/11 10:00 AM"
        },
        {
          is_selected: false,
          rule_uri: "https://gtom.com/catUri/",
          generalHeaders: {
            url: "https://gtom.com/catUri/",
            method: "PostmanRuntime/7.25.0",
            statusCode: "localhost:9005",

            remoteAddress: "https://www.verizon.com/home/phone/",
            referralPolicy: "no referral"
          },
          responseHeaders: {
            accept: "*/*",
            "user-agent": "PostmanRuntime/7.25.0",
            host: "localhost:9005",
            "timeout-access": "<function1>",
            cookie:
              "ECOMM_SESSION=eyJhbGciOiJIUzI1NiJ9.eyJkYXRhIjp7ImFwcE5hbWUiOiJlY29tbV9zdG9yZV9wcm9zcGVjdCIsIlJFRkVSRVJfVVJMIjoiL3Byb3NwZWN0L3RlYWxlYWZUYXJnZXQiLCJjc3BOb25jZSI6IjNhNzc4NTg1MzM2ZDViYzJlOTc3MWY3MDcxYmRkMWI0ZjMzNThlN2I4MWUzMzk0MWUwYTJiMjg4ODE1ZjU1MzQiLCJwbGF5U2Vzc2lvbiI6IlBPVC1ELWIwN2Q1MzBiLTU5NDEtNDVmNy04YjhmLWI5YjdhMWMxYzQ5YXtzNH0iLCJDb3JyZWxhdGlvbklkIjoiT05FRElHSVRBTC0xMDZhYjkxNy1mNGFjLTQyODEtODM5ZS1kMTVjYzA5OTQyNmQtVC0xNTg4NjQ4OTYxNjEwIn0sIm5iZiI6MTU4ODY0ODk2MSwiaWF0IjoxNTg4NjQ4OTYxfQ.jJhfEty9jzNrVtZXMU5yc2JKNQA_Y2Yei1a9QK-UoC4; GlobalSessionID=sfasdfasdf65765676fsadfas7f678sdf; billingId=Sanjeev",
            "postman-token": "0d40cbae-a0b2-4f9b-83a2-317cdd2f6ce3",
            "x-origin-path": "/jsonUri1/",
            connection: "keep-alive",
            "x-forwarded-for": "10.20.216.50",
            "x-custom-hdr": "Custom Header 1",
            "accept-encoding": "gzip, deflate, br"
          },

          created_last: "06/11 10:00 AM"
        },
        {
          is_selected: false,
          rule_uri: "https://gtom.com/catUri/",
          generalHeaders: {
            url: "https://gtom.com/catUri/",
            method: "PostmanRuntime/7.25.0",
            statusCode: "localhost:9005",

            remoteAddress: "https://www.verizon.com/home/phone/",
            referralPolicy: "no referral"
          },
          responseHeaders: {
            accept: "*/*",
            "user-agent": "PostmanRuntime/7.25.0",
            host: "localhost:9005",
            "timeout-access": "<function1>",
            cookie:
              "ECOMM_SESSION=eyJhbGciOiJIUzI1NiJ9.eyJkYXRhIjp7ImFwcE5hbWUiOiJlY29tbV9zdG9yZV9wcm9zcGVjdCIsIlJFRkVSRVJfVVJMIjoiL3Byb3NwZWN0L3RlYWxlYWZUYXJnZXQiLCJjc3BOb25jZSI6IjNhNzc4NTg1MzM2ZDViYzJlOTc3MWY3MDcxYmRkMWI0ZjMzNThlN2I4MWUzMzk0MWUwYTJiMjg4ODE1ZjU1MzQiLCJwbGF5U2Vzc2lvbiI6IlBPVC1ELWIwN2Q1MzBiLTU5NDEtNDVmNy04YjhmLWI5YjdhMWMxYzQ5YXtzNH0iLCJDb3JyZWxhdGlvbklkIjoiT05FRElHSVRBTC0xMDZhYjkxNy1mNGFjLTQyODEtODM5ZS1kMTVjYzA5OTQyNmQtVC0xNTg4NjQ4OTYxNjEwIn0sIm5iZiI6MTU4ODY0ODk2MSwiaWF0IjoxNTg4NjQ4OTYxfQ.jJhfEty9jzNrVtZXMU5yc2JKNQA_Y2Yei1a9QK-UoC4; GlobalSessionID=sfasdfasdf65765676fsadfas7f678sdf; billingId=Sanjeev",
            "postman-token": "0d40cbae-a0b2-4f9b-83a2-317cdd2f6ce3",
            "x-origin-path": "/jsonUri1/",
            connection: "keep-alive",
            "x-forwarded-for": "10.20.216.50",
            "x-custom-hdr": "Custom Header 1",
            "accept-encoding": "gzip, deflate, br"
          },

          created_last: "08/1 10:00 AM"
        },
        {
          is_selected: false,
          rule_uri: "https://gtom.com/catUri/",

          generalHeaders: {
            url: "https://gtom.com/catUri/",
            method: "PostmanRuntime/7.25.0",
            statusCode: "localhost:9005",

            remoteAddress: "https://www.verizon.com/home/phone/",
            referralPolicy: "no referral"
          },
          responseHeaders: {
            accept: "*/*",
            "user-agent": "PostmanRuntime/7.25.0",
            host: "localhost:9005",
            "timeout-access": "<function1>",
            cookie:
              "ECOMM_SESSION=eyJhbGciOiJIUzI1NiJ9.eyJkYXRhIjp7ImFwcE5hbWUiOiJlY29tbV9zdG9yZV9wcm9zcGVjdCIsIlJFRkVSRVJfVVJMIjoiL3Byb3NwZWN0L3RlYWxlYWZUYXJnZXQiLCJjc3BOb25jZSI6IjNhNzc4NTg1MzM2ZDViYzJlOTc3MWY3MDcxYmRkMWI0ZjMzNThlN2I4MWUzMzk0MWUwYTJiMjg4ODE1ZjU1MzQiLCJwbGF5U2Vzc2lvbiI6IlBPVC1ELWIwN2Q1MzBiLTU5NDEtNDVmNy04YjhmLWI5YjdhMWMxYzQ5YXtzNH0iLCJDb3JyZWxhdGlvbklkIjoiT05FRElHSVRBTC0xMDZhYjkxNy1mNGFjLTQyODEtODM5ZS1kMTVjYzA5OTQyNmQtVC0xNTg4NjQ4OTYxNjEwIn0sIm5iZiI6MTU4ODY0ODk2MSwiaWF0IjoxNTg4NjQ4OTYxfQ.jJhfEty9jzNrVtZXMU5yc2JKNQA_Y2Yei1a9QK-UoC4; GlobalSessionID=sfasdfasdf65765676fsadfas7f678sdf; billingId=Sanjeev",
            "postman-token": "0d40cbae-a0b2-4f9b-83a2-317cdd2f6ce3",
            "x-origin-path": "/jsonUri1/",
            connection: "keep-alive",
            "x-forwarded-for": "10.20.216.50",
            "x-custom-hdr": "Custom Header 1",
            "accept-encoding": "gzip, deflate, br"
          },
          created_last: "08/11 10:00 AM"
        }
      ],
      selectMode: "single",
      selected: [],

      headers: [],

      form: {
        name: "sv"
      },

      show: true
    };
  },
  created: function() {
    let serverURL = `${config.headerStatusUrl}/getAllParameters`;
    // let serverURL = 'http://localhost:8080/svstatus'
    console.log("serverURL :" + serverURL);
    axios
      .get(serverURL)
      .then(response => {
        if (!(response && response.data && response.data.content)) {
          console.log(
            "Service error - Please contact Backend admin for Services error or Retry later"
          );
          return;
        }
        if (response.data.content.length < 1) {
          console.log(
            "Services has empty data content is empty array expected list of sampling urls"
          );
        }
        this.svcol = response.data.content;
        console.log("sv ---got server data");
        console.log(response);

        this.svcol.map((o, i) => {
          o["generalHeaders"] = o["requestHeaders"];
          o["rule_uri"] = o["requestUrl"];
          o["is_selected"] = false;
          o["created_last"] = "08/1 10:00 AM";
          if (!o["responseHeaders"]) {
            o["responseHeaders"] = { ...o["requestHeaders"] };
          }
          if (
            o["responseHeaders"] &&
            Object.keys(o["responseHeaders"]).length < 1
          ) {
            o["responseHeaders"] = { ...o["requestHeaders"] };
          }
        });

        console.log("svmod data-----");
        console.log(this.svcol);
        this.items = this.svcol;
        console.log("svmod data ,,,");
      })
      .catch(error => console.log(error));
  },
  methods: {
    onRowSelected(items) {
      this.selected = items;

      let param = {
        rule: this.selected[0].rule_uri,
        created_last: this.selected[0].created_last,
        responseHeaders: this.selected[0].responseHeaders,
        generalHeaders: this.selected[0].generalHeaders
      };
      this.svpointer = param;
      this.$emit("svrefresh", param);
    }
  },
  computed: {
    filteredOrigins() {
      return this.items;
    },
    maxPage() {
      let total = this.items.length;
      let page = Math.floor(
        total / this.pageSize + (total % this.pageSize > 0 ? 1 : 0)
      );
      return Math.max(page, 1);
    }
  }
};
</script>

<style scoped>
.s-container {
  display: flex;
  flex-direction: row;

  padding-bottom: 1px;
  padding-top: 1px;
}
.s-cb-container {
  display: flex;
  justify-content: center;
  flex-flow: column;
}
.s-box1 {
  align-content: center;
}
.s-box2 {
  font-size: 14px;
}
.space-left {
  padding-left: 10px;
}

table .table .thead-light th {
  background-color: #fff !important;
  border-top: 0px !important;
}

.sideh-container{
   color: blue !important;
   display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding-bottom: 10px;

}
.sideh-container span, a {
   color: blue !important;
}
.a-container{
   display: flex;
  flex-direction: row;
  justify-content: right;

}

.sideh-container > span{
  padding-left: 15px;
}
</style>