var inputsTreeComponenets = {

	inputsTreeControllersDiv:$("#inputs_tree_btns"),
	inputsTreeDiv:$("#inputs_tree_holder"),
	generateJsonBtn : $(".generateJson"),

	branches:{
		inputsTypeA: {
			inputs:
					[

						// input one
						{
							type : "text",
							label : "Type Your Name",
							placeholder : "Type Your name",
							name : "name",
							sclass: "form-control",
							id : "name"
						},

						// input two
						{
							type : "text",
							label : "Type Your Email",
							placeholder : "Type Your Email",
							name : "email",
							sclass: "form-control",
							id : "email"
						},

						// input two
						// {
						// 	type : "select",
						// 	label : "Type Your City",
						// 	empty : "Type Your City",
						// 	name : "city",
						// 	sclass: "form-control",
						// 	id : "city",
						// 	// DataSourceUrl : "inObject",
						// 	selectOptionKey : "id",
						// 	selectOptionValue : "text",			
						// 	options : 	[
						// 					{
						// 						"id" : "1",
						// 						"text" : "cairo",
						// 					},

						// 					{
						// 						"id" : "2",
						// 						"text" : "giza",
						// 					}
						// 				],

						// }

					],					
			subsControllersBtns:[
						{
							/*------------------------------------------------------------------
							* text: inner text for the button
							* control: the input type that will be added when you fire this button	
							------------------------------------------------------------------*/
							text:"Add 1",
							control:"inputsTypeA"
						},
						{
							text:"Add 2",
							control:"inputsTypeA"
						}
			]		
		}	
	},

	// You can add to this list to extend the application 
	inputsTags: {
					text : "<input></input>",
					email : "<input></input>",
					textarea : "<textarea></textarea>",
					checkbox : "<input>",
					radio : "<input>",
					select : "<select></select>"
				},

	// application initial view starts with these controllers			
	mainControllersBtns : [
		{
			text:"Add Unit",
			control:"inputsTypeA"
		}
	]
}