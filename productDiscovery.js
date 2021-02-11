/// NOTE
// All ecomerce campaigns - domain is myshopify.com repo_id is 9; and host is bhginternational.myshopify.com
// tracking id is 779
// pageType is collection
//***************
$(document).ready(function(){

    var trackingID, useCaseID, variationID, postAPI, repoID;
    var campaignMetaUpdate,campaignMetaNew, storyTopicsMeta, storyNodesMeta, storyNodesInputContent, setupParameters;
    var activateParameters, conversionParameters;


    function addClickHandlers() {

      $("#synchronousStuffNewCampaign").click(synchronousStuffNewCampaign);

      $("#synchronousStuffUpdateCampaign").click(synchronousStuffUpdateCampaign);

      $("#asynchronousStuff").click(asynchronousStuff);

      $("#updateCampaignALL").click(updateCampaignAll);

      $("#newCampaignMeta").click(newCampaignMeta);

      $("#updateCampaignMeta").click(updateCampaignMeta);

      $("#publishStoryTopics").click(publishTopicsMeta);

      $("#publishNodesMeta").click(publishNodesMeta);

      $("#publishNodeInputContent").click(publishNodeInputContent);

      $("#campaignActivateParams").click(publishActivateParameters);

      $("#paymentProcessor").click(publishPaymentProcessorInput);

      $("#campaignSetupParams").click(publishSetupParameters);

      $("#endPublishing").click(endPublishing);

    }
    function initializeTrackingId() {
       trackingID= 779,
       useCaseID = 4,
        variationID = 1,
         repoID = 9,
         postAPI = "http://127.0.0.1:8000/api/webhooks";
         //postAPI = "https://cret.chalakh.co/api/webhooks";
    };
    function initiliazeWebhookDataObj() {
        campaignMetaUpdate = [
            {
              "metaData": {
                "trid": trackingID
              }
            },
          {
            "returnedData":

              {
                "ctype":"update",
                "vaid": variationID,
                "uscs": useCaseID,
                "tcnt": "1",
                "ncnt": "10",
                "campaignName": "Ecommerce Product Discovery",
                "webproperty": "myshopify.com",
                "campaignType": "productDiscovery",
                "customerType":"eCommerce",
                "campaignSubtype":"",
                "repoID":repoID,
                "debugMode": true,
                "audioAnnotation":false,
                "primaryColor":null,
                "secondaryColor":null,
                "visitorGreeting": ["Hey there! Would you like to know about the deals we have for you this week?"],
                "introduceStory":[],
                "callToAction":[

                ]
              }



          },

        ],

        campaignMetaNew = [
          {
            "metaData": {
              "trid": trackingID
            }
          },
          {
            "returnedData":

              {
                "ctype":"new",
                "vaid": variationID,
                "uscs": useCaseID,
                "tcnt": "1",
                "ncnt": "8",
                "campaignName": "Ecommerce Product Discovery",
                "webproperty": "myshopify.com",
                "campaignType": "productDiscovery",
                "customerType":"eCommerce",
                "campaignSubtype":"",
                "repoID":repoID,
                "debugMode": true,
                "audioAnnotation":false,
                "primaryColor":null,
                "secondaryColor":null,
                "visitorGreeting": ["Hey there! Would you like to know about the deals we have for you this week?"],
                "introduceStory":[],
                "callToAction":[


                ]
              }



          }
        ],  // important visitor greeting needs to be an array; since converted to NIMB for PA-1

        storyTopicsMeta = [
          {
            "metaData": {
              "trid": trackingID
            }
          },
          {
            "returnedData": [

              {
                "topicID": 0,
                "topicName": "Ecommerce Product Discovery",
                "topicDescription":"",
                "topicImage":"",
                "topicType": "conversationalSearch"
              }, // topic 0



            ]
          }
        ],

        storyNodesMeta = [
          {
            "metaData": {
              "trid": trackingID
            }
          },
          {
            "returnedData": [
              {
                "topicID": 0, //
                "topicType": "conversationalSearch",
                "nodeOrder": 0, // creator will make this node order 1000 - so as to give probes enough space
                "nodeDisplayName": "Your Search Results", // hardwired by webhook
                "nodeTemplateCategory": "productDiscovery",
                "skipLogicType": "default",
                "skipLogic": [

                ],
                "dataPrefilled": false,
                "searchContent": true,
                "searchQuery":false
              },

              {
                "topicID": 0,
                "topicType": "conversationalSearch",
                "nodeOrder": 1,
                "nodeDisplayName": "Terminate Conversation- Current Page",
                "nodeTemplateCategory": "terminateConversation",
                "skipLogicType": "end",
                "skipLogic": [

                ],
                "dataPrefilled": false,
                "searchContent": false,
                "searchQuery":false
              },  // 1 node order - created by Suhag's webhook WITHOUT user selection - go back to start;
            ]
          }
        ],

        storyNodesInputContent = [


          //https://jsoneditoronline.org/#right=local.davupu&left=cloud.c74437fde44a47c88f37ae2622dcc178
          // probes are inserted dynamically by creator;
          // search results are pre-cooked by creator and stored in drw
          // below is just an empty template -
          // composer does not know that probes will be inserted dynamically
          // so Creator swaps the noderOrder - 0; to (say) 1000 from template stored in database;

          {
            "topicID": 0,
            "nodeOrder": 0, // node order is 1000 or something large; so enough space for probes inserted;
            "nodeDisplayName": "Your Product Search Results",
            "nodeTemplateCategory": "productDiscovery",
            "contentType": "productProfile", // allows for multiple search result nodes - curriculumSearch - courseDescription, facultyProfiles
            "searchQuery":false,
            "searchContent":true,
            "conversationBlurbs":["So here is what I found for you", "Hope this is what you were looking for", "You can always search for more"],
            "audioAnnotation": [],
            "nodeInputContent": [ // this structure HAS to match the c6 structure
              {
                "attribute_type_1": "",
                "attribute_type_1_value": [],
                "attribute_type_2": "",
                "attribute_type_2_value": [],
                "attribute_type_3": [],
                "attribute_type_3_value": [],
                "attribute_type_4": "",
                "attribute_type_4_value": [],
                "attribute_type_5": "",
                "attribute_type_5_value": [],
                "returnPolicy":["Accept returns, exchange or refunds within 1 month of delivery or date of purchase", "Returned products must be in the original condition as when it was delivered", "must include its original vendor packaging, price tag(s), and Order Confirmation and/or invoice", "Refund credit will be in the form of BHG Credit Vouchers or in original mode of payment"],
                "shippingPolicy":["FREE delivery for purchases above $150", "Purchases below $150, shipping cost $9.90", "No delivery on Sundays and Public Holidays", "2-4 working days standard delivery time"],
                "financingOption":"",
                "productBrand":"",
                "productID":"",
                "variationTitles":[],
                "inventoryQuantity":[],
                "productImages":[], // if no variant images
                "showProductDetails":0, // place holder
                "showBrandDetails":0, // place holder
                "showCustomerReviews":0, // place holder
                "productTitle":"",
                "variationCompareAtPrices": [], // array for each variant
                "variationIDs": [], // array of all variant ids
                "variationImages": [], // source url array for each variant
                "variationPrices": [],

              }

            ]
          }, //  0, this is empty product profile, not sure needed - creator will create templates

          {
              "topicID": 0,
              "nodeOrder": 1,
              "nodeDisplayName": "Terminate Conversation - Current Page",
              "nodeTemplateCategory": "terminateConversation",
              "terminationMode": 'goBackToStart',
              "goalCompleted": true,
              "conversationBlurbs":[],
              "audioAnnotation": [],
              "nodeInputContent": [{
                "exitMessage": ["I hope I was helpful", "I will now take you back", "In case you want to search for something more"]
              }]
            }, // 1001
          ];

        setupParameters = [
          {
            "metaData": {
              "trid": trackingID
            }
          },
          {
            "returnedData": {
              "traffic": [
                "email",
                "textMsg",
                "direct", "all"
              ],
              "pageType": "website",
              "device": [
                "mobile",
                "desktop", "tablet"
              ],
              "region": [
                "USA",
                "CANADA",
                "UK",
                "IRELAND",
                "AUSTRALIA"
              ],
              "minimumProductsShown": 1,
              "maximumProductsShown":20,
              "pageTarget": [
                {
                  "group": [
                    {
                      "subGroup": {
                        "urlCategory": "url host",
                        "urlCategoryMatchType": "is",
                        "subGroupMatch": [
                          {
                            "urlCategoryValue": "bhginternational.myshopify.com"
                          },

                        ]
                      }
                    },
                    {
                      "subGroup": {
                        "urlCategory": "page type",
                        "urlCategoryMatchType": "is",
                        "subGroupMatch": [
                          {
                            "urlCategoryValue": "collection"
                          }
                        ]
                      }
                    },
                    {
                      "subGroup": {
                        "urlCategory": "url query",
                        "urlCategoryMatchType": "is not",
                        "subGroupMatch": [
                          {
                            "urlCategoryValue": "cpc=p"
                          },
                          {
                            "urlCategoryValue": "sku=1"
                          }
                        ]
                      }
                    },
                    {
                      "subGroup": {
                        "urlCategory": "url filters",
                        "urlCategoryMatchType": "includes",
                        "subGroupMatch": [
                          {
                            "urlCategoryValue": "collections/women"
                          },
                          {
                            "urlCategoryValue": "collections/beauty"
                          }
                        ]
                      }
                    }
                  ],
                }
              ],
              "visitorSegment": {
                "visitHistory":"all",
                "membership":  "all",
                "purchaseHistory":"all",
                "gender":"all",
                "priority": 4,
              },
              "merchandisingStrategy": [
                {
                  "strategy": "New Arrivals",
                  "displayName": "Checkout New Arrivals at BHG",
                  "displayImage": "https://...."
                },
                {
                  "strategy": "New Brands",
                  "displayName": "Exclusive Brands Available at BHG",
                  "displayImage": "https://...."
                },
                {
                  "strategy": "Sales Deals",
                  "displayName": "Our Year-End Blowout Sales",
                  "displayImage": "https://...."
                }
              ],

              "productFilters": {
                "minPrice": "50",
                "maxPrice": "150",
                "excludeOutOfStock": true,
                "excludeDiscountedProducts": false,
                "excludePreviousPurchases": false,
                "productMargin": "high",
                "brands": { // send empty object if brands are not selected
                  "selectionType" : "include", // exclude
                  "brands": ["Nike", "Addidas"]
                }
              }
            }
          }]; // for 779

        setupParametersFor779 = [
        {
          "metaData": {
            "trid": trackingID
          }
        },
        {
          "returnedData": {
            "traffic": [
              "email",
              "textMsg",
              "direct", "all"
            ],
            "pageType": "website",
            "device": [
              "mobile",
              "desktop", "tablet"
            ],
            "region": [
              "USA",
              "CANADA",
              "UK",
              "IRELAND",
              "AUSTRALIA"
            ],
            "minimumProductsShown": 1,
            "maximumProductsShown":20,
            "pageTarget": [
              {
                "group": [
                  {
                    "subGroup": {
                      "urlCategory": "url host",
                      "urlCategoryMatchType": "is",
                      "subGroupMatch": [
                        {
                          "urlCategoryValue": "bhginternational.myshopify.com"
                        },
                      ]
                    }
                  },
                  {
                    "subGroup": {
                      "urlCategory": "page type",
                      "urlCategoryMatchType": "is",
                      "subGroupMatch": [
                        {
                          "urlCategoryValue": "collection"
                        }
                      ]
                    }
                  },
                  {
                    "subGroup": {
                      "urlCategory": "url query",
                      "urlCategoryMatchType": "is not",
                      "subGroupMatch": [
                        {
                          "urlCategoryValue": "cpc=p"
                        },
                        {
                          "urlCategoryValue": "sku=1"
                        }
                      ]
                    }
                  },
                  {
                    "subGroup": {
                      "urlCategory": "url filters",
                      "urlCategoryMatchType": "includes",
                      "subGroupMatch": [
                        {
                          "urlCategoryValue": "collections/women"
                        },
                        {
                          "urlCategoryValue": "collections/beauty"
                        }
                      ]
                    }
                  }
                ],
              }
            ],
            "visitorSegment": {
              "visitHistory":"all",
              "membership":  "all",
              "purchaseHistory":"browser",
              "gender":"male",
              "priority":3,
            },
            "merchandisingStrategy": [
              {
                "strategy": "New Arrivals",
                "displayName": "Checkout New Arrivals at BHG",
                "displayImage": "https://...."
              },
              {
                "strategy": "New Brands",
                "displayName": "Exclusive Brands Available at BHG",
                "displayImage": "https://...."
              },
              {
                "strategy": "Sales Deals",
                "displayName": "Our Year-End Blowout Sales",
                "displayImage": "https://...."
              }
            ],
            "productFilters": {
              "minPrice": "5",
              "maxPrice": "150",
              "excludeOutOfStock": true,
              "excludeDiscountedProducts": false,
              "excludePreviousPurchases": false,
              "productMargin": "high",
              "brands": { // send empty object if brands are not selected
                "selectionType" : "include", // exclude
                "brands": ["Nike", "Addidas"]
              }
            }
          }
        }]; // for 780

        activateParameters = [
          {
            "metaData": {
              "trid": trackingID
            }
          },
          {
            "returnedData": {
              "trafficAllocatedToBot": "1.0",
              "optimization": {
                "optimizationMethod": "manualOptimization",

                "conversationInitiationMode": "hybrid",
                "websiteBehaviour": [
                  {
                    "behaviorType": "secondsOnPage",
                    "triggerValue": "30",
                    "logicOperand":null
                  },
                  {
                    "behaviorType": "secondsOnWebsite",
                    "triggerValue": "60",
                    "logicOperand":"or"
                  },
                  {
                    "behaviorType": "pageViews",
                    "triggerValue": "1",
                    "logicOperand":"and"
                  },
                  /*
                  {
                    "behaviorType": "pageScrollDepth",
                    "triggerValue": "60",
                    "logicOperand":"and"
                  } */

                ],
                "maxConversationAttempts": {
                  "maxAttemptsDuringVisits":null,
                  "maxAttemptsAcrossVisits":null,
                }
              },
              "schedule":
                {
                  "timeZone": "EST",
                  "scheduledHours": [
                    {
                      "day": "Monday",
                      "from": "0",
                      "to": "23"
                    },
                    {
                      "day": "Tuesday",
                      "from": "0",
                      "to": "23"
                    },
                    {
                      "day": "Wednesday",
                      "from": "0",
                      "to": "23"
                    },
                    {
                      "day": "Thursday",
                      "from": "0",
                      "to": "23"
                    },
                    {
                      "day": "Friday",
                      "from": "0",
                      "to": "23"
                    },
                    {
                      "day": "Saturday",
                      "from": "0",
                      "to": "23"
                    },
                    {
                      "day": "Sunday",
                      "from": "0",
                      "to": "23"
                    }
                  ]
                }

            }
          }
        ]; // json for manual optimization, scroll depth commented out, since a little complicaed

        SelfactivateParameters = [
          {
            "metaData": {
              "trid": trackingID
            }
          },
          {
            "returnedData": {
              "trafficAllocatedToBot": "1.0",
              "optimization": {
                "optimizationMethod": "selfOptimization",

              },
              "schedule":
                {
                  "timeZone": "EST",
                  "scheduledHours": [
                    {
                      "day": "Monday",
                      "from": "0",
                      "to": "23"
                    },
                    {
                      "day": "Tuesday",
                      "from": "0",
                      "to": "23"
                    },
                    {
                      "day": "Wednesday",
                      "from": "0",
                      "to": "23"
                    },
                    {
                      "day": "Thursday",
                      "from": "0",
                      "to": "23"
                    },
                    {
                      "day": "Friday",
                      "from": "0",
                      "to": "23"
                    },
                    {
                      "day": "Saturday",
                      "from": "0",
                      "to": "23"
                    },
                    {
                      "day": "Sunday",
                      "from": "0",
                      "to": "23"
                    }
                  ]
                }

            }
          }
        ]; // json for self optimization

        conversionParameters = [
          {
            "metaData": {
              "trid": trackingID
            }
          },
          {
            "returnedData": {
              "includeSmartProbe":false,
              "goal": [
                {
                  "fieldName": "prospectName",
                  "label":" Prospect Name",
                  "required": true,
                  "importance": "2"},
                {
                  "fieldName": "phoneNumber",
                  "importance": "3",
                  "label":" Phone Number",
                  "required": true,},
                {
                  "fieldName": "emailAddress",
                  "importance": "1",
                  "label":" Email Address",
                  "required": true,},
                {
                  "fieldName": "companyName",
                  "importance": "4",
                  "label":"Company Name",
                  "required": true,},
                {
                  "fieldName": "businessTitle",
                  "importance": "5",
                  "label":"Business Title",
                  "required": true}
              ]
            }
          }];

    }

    addClickHandlers();
    initializeTrackingId();
    initiliazeWebhookDataObj();

     // termination mode can be "exitOnNewPage", exitOnCurrentPage, exitWithWithoutMessage
     // if exitOnNewPage then skipto for skipType end should have the url;

    function postPayload(dataToBeSent, webHookType, trid) { // for now for surveys, answers and contact information - but can be for other user case

          apiURL = postAPI +'?whtype=' + webHookType + '&trid=' + trid;
          dataToBeSent = JSON.stringify(dataToBeSent); // if the object is not pure JSON the data is not posted
          var deferred = $.Deferred();
          $.ajax({
            method: 'POST', // only post is valid
            dataType: 'json', // this is what is received;
            //  contentType: "application/x-www-form-urlencoded", // data being sent; this format means a key-value pair
            contentType: "application/json", // IMPORTANT. DONT use it this will trigger a preflight handshake, with an OPTIONS call; Need Laravel to Handle that
            data: dataToBeSent,

            url: apiURL,
            success: function (response, status, xhr) { // What to do if we succeed

              try {
                var q = JSON.parse(response);
              } catch (e) {
                var a = JSON.stringify(response);
              }
              console.log(response, status, xhr.statusText);
              deferred.resolve(response);

            },
            error: function (jqXHR, response, textStatus, errorThrown) { // What to do if we fail
              console.log(JSON.stringify(jqXHR));
              console.log("AJAX error: " + textStatus + ' : ' + errorThrown);
              deferred.reject(response);
            }
          });
          return deferred.promise();
      } // with concept of promise

    function synchronousStuffNewCampaign(a) {

      var items = [ [campaignMetaNew, 'start', trackingID],
        [storyTopicsMeta, 'topicsMeta', trackingID],
        [storyNodesMeta, 'nodesMeta', trackingID],
      ];

      var looper = $.Deferred().resolve();

      // go through each item and call the ajax function
      $.when.apply($, $.map(items, function(item, i) {
        looper = looper.then(function() {
          // trigger ajax call with item data
          return postPayload(item[0], item[1], item[2]);
        });
        return looper;
      })).then(function() {
        // run this after all ajax calls have completed
        console.log('Done!');
      });
    } // to make sure campaign meta, topics meta, and node meta are published sequentially

    function synchronousStuffUpdateCampaign(a) {

    var items = [ [campaignMetaUpdate, 'start', trackingID],
      [storyTopicsMeta, 'topicsMeta', trackingID],
      [storyNodesMeta, 'nodesMeta', trackingID],
    ];

    var looper = $.Deferred().resolve();

    // go through each item and call the ajax function
    $.when.apply($, $.map(items, function(item, i) {
      looper = looper.then(function() {
        // trigger ajax call with item data
        return postPayload(item[0], item[1], item[2]);
      });
      return looper;
    })).then(function() {
      // run this after all ajax calls have completed
      console.log('Done!');
    });
  }

    function asynchronousStuff(a) {

      var response = publishNodeInputContent(a);
      var response = publishSetupParameters(a);
      var response = publishActivateParameters(a);
      var response = publishCampaignConversionGoals(a);


    }  // rest of the stuff - node input, activate, setup object

    function newCampaignMeta(a) {

      var response = postPayload(campaignMetaNew, 'start', trackingID);

    }

    function updateCampaignMeta(a) {

      var response = postPayload(campaignMetaUpdate, 'start', trackingID);

    }

    function publishPaymentProcessorInput(a) {
      var payload = [];
      metaData = {"trid":trackingID};
      payload[0] = {metaData};

      returnedData = paymentProcessorNodeInputContent;
      payload[1] = {returnedData};
      var response = postPayload(payload, 'nodeInputContent', trackingID);

    }

    function publishTopicsMeta(a) {

        var response = postPayload(storyTopicsMeta, 'topicsMeta', trackingID);

    }

    function publishNodesMeta(a) {

      var response = postPayload(storyNodesMeta, 'nodesMeta', trackingID);

    }

    function publishNodeInputContent(a) {

       var payload = [];

       metaData = {"trid":trackingID};
       payload[0] = {metaData};

     for (var n = 0; n < storyNodesInputContent.length; n++) {

          returnedData = storyNodesInputContent[n];
          payload[1] = {returnedData};
          var response = postPayload(payload, 'nodeInputContent', trackingID);
        }

    }

    function publishSetupParameters(a) {

      var response = postPayload(setupParameters, 'setup', trackingID);

    }

    function publishCampaignConversionGoals(a) {

      var response = postPayload(conversionParameters, 'cgoal', trackingID);

    }

    function publishActivateParameters(a) {

    var response = postPayload(activateParameters, 'activate', trackingID);

  }

    //https://www.webniraj.com/2018/10/08/making-ajax-calls-sequentially-using-jquery/



    function updateCampaignAll(a) {

      var response = updateCampaignMeta(a);
      var response = publishTopicsMeta(a);
      var response = publishNodesMeta(a);
      var response = publishNodeOutputContent(a);
      var response = publishSetupParameters(a);
      var response = publishActivateParameters(a);

  }

    function endPublishing(a) {

      var response = postPayload(null, 'end', trackingID);

    }



});
