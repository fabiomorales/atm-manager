import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('movement', table => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));

    table.string('type_movement').notNullable();
    table.string('description').notNullable();
    table.decimal('value').notNullable();

    table.uuid('customer_id').unsigned().references('id').inTable('customer').notNullable();
    table.uuid('atm_id').unsigned().references('id').inTable('atm').notNullable();

    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.timestamp('deleted_at');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('movement');
}
