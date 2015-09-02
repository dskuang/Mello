# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.create({username: "MyUser", password: 123456})
User.create({username: "jackson123", password: 123456})
User.create({username: "hamiltonK", password: 123456})
User.create({username: "deluxe999", password: 123456})
User.create({username: "superdeep", password: 123456})
User.create({username: "JasonBlack", password: 123456})

Board.create({title: "MyOwnBoard", user_id: 1})
Board.create({title: "Taxes", user_id: 1})
Board.create({title: "Creativity", user_id: 1})
Board.create({title: "Workspace", user_id: 1})
Board.create({title: "RentStuff", user_id: 1})
Board.create({title: "Loans", user_id: 2})

List.create({board_id: 1, title: "FutureWork", ord: 1})
List.create({board_id: 1, title: "CurrentWork" , ord: 2})
List.create({board_id: 1, title: "Necessities", ord: 3})
List.create({board_id: 1, title: "Payments", ord: 4})
List.create({board_id: 1, title: "Loans", ord: 5})
List.create({board_id: 1, title: "Unecessary", ord: 6})
List.create({board_id: 1, title: "Jobs", ord: 7})
List.create({board_id: 1, title: "Employment", ord: 8})
List.create({board_id: 1, title: "NeedingWork", ord: 9})
List.create({board_id: 1, title: "HomeWork", ord: 10})
List.create({board_id: 1, title: "Pet", ord: 11})
List.create({board_id: 1, title: "Alarms", ord: 12})

2.times do |num|
  Card.create({list_id: 1, title: Faker::Address.city,ord: num})
end

15.times do |num|
  Card.create({list_id: 2, title: Faker::Address.city,ord: num})
end

12.times do |num|
  Card.create({list_id: 3, title: Faker::Address.city,ord: num})
end

6.times do |num|
  Card.create({list_id: 4, title: Faker::Address.city, ord: num})
end

8.times do |num|
  Card.create({list_id: 5, title: Faker::Address.city, ord: num})
end

12.times do |num|
  Card.create({list_id: 6, title: Faker::Address.city, ord: num})
end

3.times do |num|
  Card.create({list_id: 7, title: Faker::Address.city,ord: num})
end

5.times do |num|
  Card.create({list_id: 8, title: Faker::Address.city, ord: num})
end

8.times do |num|
  Card.create({list_id: 9, title: Faker::Address.city, ord: num})
end

4.times do |num|
  Card.create({list_id: 10, title: Faker::Address.city, ord: num})
end

12.times do |num|
  Card.create({list_id: 11, title: Faker::Address.city,ord: num})
end

14.times do |num|
  Card.create({list_id: 12, title: Faker::Address.city,ord: num})
end
