const { updateById } = require("./Menu");

const HairSwap = {
    tableName: 'hair_styles',

    columns: {
        id : "INT AUTO_INCREMENT PRIMARY KEY",
        name : "VARCHAR(255)",
        avatar : "VARCHAR(255) NOT NULL",
        gender : "ENUM('male', 'female') NOT NULL",
        created_at : "TIMESTAMP DEFAULT CURRENT_TIMESTAMP"
    },
}    


module.exports = HairSwap;
