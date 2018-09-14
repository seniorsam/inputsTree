var inputsTreeComponenets = {

	inputsTreeControllersDiv:$("#inputs_tree_main_controllers"),
	inputsTreeActionControllersDiv:$("#inputs_tree_action_btns"),
	inputsTreeDiv:$("#inputs_tree_holder"),

	// application initial view starts with these controllers			
	mainControllersBtns : [
		{
			text:"+ Add Unit",
			control:"branchOne"
		}
	],

	branches:{
		// form one
		branchOne: {
			// inputs 
			inputs:
					[
						{
							type : "text",
							label : "Type Your Name",
							placeholder : "Type Your name",
							name : "name",
							id : "name"
						},
						{
							type : "text",
							label : "Type Your Email",
							placeholder : "Type Your Email",
							name : "email",
							id : "email"
						},
						{
							type : "text",
							label : "Type Your Phone Number",
							placeholder : "Type Your Phone Number",
							name : "phone",
							id : "phone"
						},
					],

			// sub controllers for this branch		
			subsControllersBtns:[
						{
							/*------------------------------------------------------------------
							* text: inner text for the button
							* control: the input type that will be added when you fire this button	
							------------------------------------------------------------------*/
							text:"Add Form One",
							control:"branchOne"
						},
						{
							/*------------------------------------------------------------------
							* text: inner text for the button
							* control: the input type that will be added when you fire this button	
							------------------------------------------------------------------*/
							text:"Add Form Two",
							control:"branchTwo"
						}
			]		
		},
		// form two
		branchTwo: {
			// inputs 
			inputs:
					[
						{
							type : "text",
							label : "Type Your Age",
							placeholder : "Your age",
							name : "age",
							id : "age"
						},
						{
							type : "select",
							label : "Type Your City",
							empty : "Type Your City",
							name : "city",
							id : "city",
							DataSourceUrl : "json_options.json",
							selectOptionKey : "id",
							selectOptionValue : "text",			
							options : 	[
											{
												"id" : "1",
												"text" : "cairo",
											},

											{
												"id" : "2",
												"text" : "giza",
											}
										],
						}
					],
			// sub controllers for this branch		
			subsControllersBtns:[
						{
							/*------------------------------------------------------------------
							* text: inner text for the button
							* control: the input type that will be added when you fire this button	
							------------------------------------------------------------------*/
							text:"Add Form One",
							control:"branchOne"
						},
						{
							/*------------------------------------------------------------------
							* text: inner text for the button
							* control: the input type that will be added when you fire this button	
							------------------------------------------------------------------*/
							text:"Add Form Two",
							control:"branchTwo"
						}
			]		
		}	
	},

	jsonGenerateBtn:true,
	jsonGenerateBtnText:'Generate Json',
	jsonGenerateShowMethod:'log',
	jsonActionBtn:true,
	jsonActionBtnText:'Ajax Call',
	jsonActionUrl:'request.php'
}