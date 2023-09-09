const { mongoDatabaseCRUD_Ops } = require('./MongoDbControlCenter');

function aa(){try{mongoDatabaseCRUD_Ops();}
catch(error:any){
    console.log("🚀 ~ file: app.ts:5 ~ error:", error.message)
    
}}

aa();