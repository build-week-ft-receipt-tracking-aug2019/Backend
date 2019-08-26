exports.up = function(knex) {
    return knex.schema
        .createTable('users', tbl => {
            tbl.increments();
            tbl.string('username', 50)
                .notNullable()
                .unique();
            tbl.string('email', 100)
                .notNullable()
                .unique();
            tbl.string('password', 255)
                .notNullable();
        })
        .createTable('receipts', tbl => {
            tbl.increments();
            tbl.dateTime('date')
                .notNullable();
            tbl.integer('amount-spent')
                .notNullable();
            tbl.string('category', 100)
                .notNullable();
            tbl.string('merchant', 100)
                .notNullable();
            tbl.integer('user_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('users')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
        });
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('users')
        .dropTableIfExists('receipts');
};
