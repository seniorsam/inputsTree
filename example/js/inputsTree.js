/*--------------------------------------------------------------
* @author sameh abdel moneim <http://www.github.com/seniorsam>
----------------------------------------------------------------*/

;(function($, window, document, undefined){

	var inputsTree = {

		inputsTreeComponenets: {},

		inputsTags: {
					text : "<input></input>",
					email : "<input></input>",
					textarea : "<textarea></textarea>",
					checkbox : "<input>",
					radio : "<input>",
					select : "<select></select>"
				},

		init: function( inputsTreeComponenets ){

				// assign the application components through the passed options in parameter
				inputsTree.inputsTreeComponenets = inputsTreeComponenets;

				// generate json controller
				inputsTree.generatedJsonController();

				// create the main controller buttons
				$.each(inputsTree.inputsTreeComponenets.mainControllersBtns, function(index, controller){
					inputsTree.setControllersBtn(controller, 'mainCat')
							  .appendTo( inputsTree.inputsTreeComponenets.inputsTreeControllersDiv);
				});				
			
		},

		/*-----------------------------
		* set main controller buttons
		-------------------------------*/

		setControllersBtn: function(controller, grade){

			return $("<button></button>")
						.text(controller.text)
						.on('click', function(){
							/*--------------------------------------------------------------------------------
							* [controller.control]
							* controller represent the passed controller(button) 
							* control represent the inputs type that will be added when you fire the button
							----------------------------------------------------------------------------------*/
					  		generatedHtmlForm = inputsTree.generateHtmlContent( inputsTree.inputsTreeComponenets.branches[controller.control] );
					  		if(grade === 'mainCat'){
					  			// append generated html the main container div directly
						  		inputsTree.inputsTreeComponenets.inputsTreeDiv.append( generatedHtmlForm );
					  		} else if(grade === 'subCat') {
					  			// append generated html to the button parent
					  			$(this).closest('.inTreeNode').append( generatedHtmlForm );
					  		}
						});
		},

		/*--------------------------------------------------------------------------
		*	Here We Will Generate Html Content For each Input Based On its options
		----------------------------------------------------------------------------*/

		generateHtmlContent: function( ContentOptions ){

			// first we need to get the last order in the application added nodes
			var max = 0;
 
            inputsTree.inputsTreeComponenets.inputsTreeDiv.find('div.inTreeNode').each(function(){
                var val = $(this).attr('data-inTreeNodeOrder');
                if(val > max) max = val;
            });
 
            var currOrder = (max == 0) ? 1 : parseInt(max)+1,
            	 
            	generatedContent =  $('<div></div>').attr('class','inTreeNode')
													.attr('data-inTreeNodeOrder', currOrder)
													.attr('data-inTreeNodealyas', 'n_'+currOrder),
				
					rowControllersContent = $('<div></div>').attr('class', 'inTreeNodeControllers');


			$.each(ContentOptions.inputs, function(index, value){
				generatedContent = generatedContent.append( $('<div></div>')
												   .attr('class', 'inTreeInputWrapper')
												   .append(inputsTree.readInputTypeAndReturnHtmlTags( value )) );
			});

			// controllers
			$.each(ContentOptions.subsControllersBtns, function(index, subController){
				rowControllersContent = rowControllersContent.append( inputsTree.setControllersBtn( subController, 'subCat' ) );
			});


			// append the delete button
			rowControllersContent = rowControllersContent.append(
										$('<button>delete</button>').on('click', function(){	
											$(this).closest('.inTreeNode').remove();
										})
									);

			// final markup
			return generatedContent =  generatedContent.append( rowControllersContent);
		},

		/*--------------------------------------------------------
		* Read The Input Type And Return The corresponding Html Input
		----------------------------------------------------------*/

		readInputTypeAndReturnHtmlTags: function ( inputOpts ){

			// fetch data from input tags object bases on the passed input type
			var inputTag = inputsTree.inputsTags[inputOpts.type];

			// set basic input attributes
			inputTag = $(inputTag).attr('type', inputOpts.type)
								  .attr('name', inputOpts.name)
								  // to label that as a input related to a node in the app
								  .attr('class', 'inTreeNodeInput');	
			
			// attributes that might be passed or not
			inputTag = ("sclass" in inputOpts) 
								? inputTag.addClass(inputOpts.sclass )
								: inputTag;

			inputTag = ("id" in inputOpts) 
								? inputTag.attr('id', inputOpts.id ) 
								: inputTag;

			inputTag = ("placeholder" in inputOpts) 
								? inputTag.attr('placeholder', inputOpts.placeholder ) 
								: inputTag;

			// if the input is a select inputs /options/empty value/
			if( inputOpts.type === 'select'){
				
				var optionPrint = $('<option></option>'),
					selectOptions = '';

				// set the first/default option in the select box
				if("empty" in inputOpts){
					// set default option in the select tag
					inputTag = inputTag.append( optionPrint.attr("value","").text(inputOpts.empty) )
																			.clone(true);
				}

				if("DataSourceUrl" in inputOpts){
					selectOptions = inputsTree.getSelectOptionsData(inputOpts.DataSourceUrl)
				} else {
					selectOptions = inputOpts.options;
				}

				// set rest of the options
				for(var i = 0; i < selectOptions.length ; i++){
					inputTag = inputTag.append 	( optionPrint.attr( "value", selectOptions[i][inputOpts.selectOptionKey] )
																					.text( selectOptions[i][inputOpts.selectOptionValue] ) )
																					.clone( true );
				}
			}

			return inputTag;

		},

		/*--------------------------------------------------------
		* ajax call to get select tag options
		----------------------------------------------------------*/		

		getSelectOptionsData: function( url ){

			var d;

			 $.ajax({
		    	type: "GET",
		        url: url,
		        dataType: "JSON",
		        async:false,
		        success: function ( data ) {
		        	d = data ;
			    },
			    fail:function(){
			    	alert('Error: While Trying To Fetch Options Values For Select Input');
			    }
			});

			return d; 
		},

		/*--------------------------------------------------------
		* ajax call to send generated json data in a request to url
		----------------------------------------------------------*/

		generateJsonRequestAction: function( url, data ){

			 $.ajax({
		    	type: "POST",
		        url: url,
		        data:{it_data: data},
			    dataType: "json",
			    fail:function(){
			    	alert('Error: While Trying To Send Ajax Request To Action URL');
			    }
			}); 
		},

		/*--------------------------------------------------------
		* build and generate json object for the inputs tree
		----------------------------------------------------------*/

		jsonTreeObjectBuild: function(){

			var jsonTreeObject = {},
				inTreeNodes = inputsTree.inputsTreeComponenets.inputsTreeDiv.find('.inTreeNode');

			$.each(inTreeNodes, function(i, node){

				var nodeAlyas   = $(node).attr('data-intreenodealyas'),
					nodeParents = $(node).parents('.inTreeNode'),
					nodePositionString = '';

				// create a position in the json object for this node
				$.each(nodeParents.get().reverse(), function(parentIndex, parentValue){
					nodePositionString += $(parentValue).attr('data-intreenodealyas') + '.' + 'subs' + '.';
				});

				nodePositionString = nodePositionString + nodeAlyas;

				// we get the children of children because we wrap each input in div.inTreeInputWrapper
				var nodesInputs = $(node).children('.inTreeInputWrapper')
										 .children('.inTreeNodeInput');
				
				// loop through inputs and push to the json 				
				$.each(nodesInputs,function(ii, input){
					// set the values in it's position in the json tree object
					inputsTree.assignValueToJsonTreeObject( jsonTreeObject, nodePositionString + '.' + $(input).attr('name'), $(input).val());
				});

				
			});

			return jsonTreeObject;
		},

		/*--------------------------------------------------------
		set the generate json button and the action button
		----------------------------------------------------------*/

		generatedJsonController:function(){

			if( inputsTreeComponenets.jsonGenerateBtn == true){

				// create the generate json button	
				inputsTree.inputsTreeComponenets.inputsTreeActionControllersDiv.append(
					
					$('<button></button>')
					.text(inputsTree.inputsTreeComponenets.jsonGenerateBtnText )
					.attr('class', 'jsonBtn')	
					.on('click', function(){

						var generatedJson = inputsTree.jsonTreeObjectBuild();
						switch( inputsTree.inputsTreeComponenets.jsonGenerateShowMethod ){
							case 'log':
								console.log( generatedJson );
								break;
							case 'alert':
								alert(  JSON.stringify(generatedJson)  );
								break;
							default:
								console.log( generatedJson );
								break;		
						}
						
						
					})

				);

				// json action button
				inputsTree.inputsTreeComponenets.inputsTreeActionControllersDiv.append(
					
					$('<button></button>')
					.text(inputsTree.inputsTreeComponenets.jsonActionBtnText)
					.attr('class', 'actionBtn')	
					.on('click', function(){
						var generatedJson = inputsTree.jsonTreeObjectBuild();
						inputsTree.generateJsonRequestAction( inputsTree.inputsTreeComponenets.jsonActionUrl, generatedJson );
					})

				);

			}
		},

		/*--------------------------------------------------------
		set a value in json object from a string key a.b.c
		----------------------------------------------------------*/

		assignValueToJsonTreeObject : function assign(obj, prop, value) {
		    if (typeof prop === "string")
		        prop = prop.split(".");

		    if (prop.length > 1) {
		        var e = prop.shift();
		        assign(obj[e] =
		                 Object.prototype.toString.call(obj[e]) === "[object Object]"
		                 ? obj[e]
		                 : {},
		               prop,
		               value);
		    } else
		        obj[prop[0]] = value;
		}, 

	}

	// assign the init function to global scope
	window.inputsTree = function( inputsTreeComponenets ){
		inputsTree.init( inputsTreeComponenets );		
	}

}(jQuery, window, document))