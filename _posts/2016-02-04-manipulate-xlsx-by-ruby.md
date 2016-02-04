---
layout: post
title: Manipulate Excel(.xlsx) by Ruby
date: 2016-02-04
categories: [Ruby]
tags: [Ruby, Excel]
---

#### 1. Introduction

Recently, I got a small task from my boss which required me to find and eliminate the repeat items based on specific columns from 5 Excel files by Ruby. To be more clear, details are listed as following:

- One seed Excel file which contains all the items
- Other Excel files will be used to retrieve and compare with the seed Excel file based on specific columns
- If there is any repeat item, remove it from the seed file
- Finally, export a new Excel file

Because it didn't refer to a very complicated manipulation, I decided to use [rubyXL](https://github.com/weshatheleopard/rubyXL) to implement the task. Another good gem for manipulating Excel is [axlsx](https://github.com/randym/axlsx). 

#### 2. Ruby scripts

*2.1. Compare a single Excel file with the seed Excel file and remove repeat items from the seed file*
 
```ruby
#!/usr/bin/ruby

require 'rubyXL'

# Check arguments
if ARGV.length != 8 or not File.exist?(ARGV[3]) or not File.exists?(ARGV[7])
  puts "Usage: ./filter.rb seed_file_column_name seed_file_column_index seed_file_end_indicator path_to_seed_file exclude_file_column_name exclude_file_column_index exclude_file_end_indicator path_to_exclude_file"
  exit
end

# Parse arguments
seed_file_column_name = ARGV[0]
seed_file_column_index = ARGV[1]
seed_file_end_indicator = ARGV[2]
path_to_seed_file = ARGV[3]
exclude_file_column_name = ARGV[4]
exclude_file_column_index = ARGV[5] 
exclude_file_end_indicator = ARGV[6]
path_to_exclude_file = ARGV[7]

# Init variables, data structure for filtered entities and excel parsing
filtered_companies_index = []
filtered_companies = {}
exclude_companies_index = []
exclude_companies = {}
seed_wb = RubyXL::Parser.parse(path_to_seed_file)
exclude_wb = RubyXL::Parser.parse(path_to_exclude_file)
filtered_wb = RubyXL::Workbook.new

# Define a new function for structuring the workbook
def structure_workbook(wb, column_index, column_name, end_indicator)
  columns = []
  companies_index = []
  companies = {}
  worksheet = wb[0]
  lambda do
    worksheet.each do |row|
      if columns.empty?
        row.cells.each do |cell|
          columns << cell.value
        end
      else
        company = []
        row.cells.each do |cell|
          company << cell.value
          if columns[company.size - 1] == column_name
            return if cell.value == end_indicator
            companies[cell.value] = company
            companies_index << company[column_index.to_i]
          end
        end
      end
      if not columns.include? column_name
        columns.clear
      end
    end
  end.call
  return [companies, companies_index]
end

# Parse seed and exclude workbooks and populate data structures
filtered_companies, filtered_companies_index = structure_workbook(seed_wb, seed_file_column_index, seed_file_column_name, seed_file_end_indicator)
exclude_companies, exclude_companies_index = structure_workbook(exclude_wb, exclude_file_column_index, exclude_file_column_name, exclude_file_end_indicator)

# Find the differences
intersections_companies_index = exclude_companies_index & filtered_companies_index
diff_companies_index = exclude_companies_index - filtered_companies_index

# Export results to the new Excel
diff_companies_index.each_with_index { |val,index|
  exclude_companies[val].each_with_index { |val1, index1|
    filtered_wb.worksheets[0].insert_cell(index, index1, val1)
  }
}

# Output
filtered_wb.write('filtered.xlsx')
puts intersections_companies_index
puts '---A new Excel file called filtered.xlsx has been generated and repeat items are shown above!---'
```


*2.2. Compare multiple Excel files with the seed Excel file and remove repeat items from the seed file* 

```ruby
#!/usr/bin/ruby
​
require 'rubyXL'
​
# Check arguments
if ARGV.length < 6 or not File.exist?(ARGV[2])
  puts "Usage: ./filter.rb seed_file_column_name seed_file_end_indicator path_to_seed_file exclude_file_column_name exclude_file_end_indicator path_to_exclude_file path_to_exclude_file .."
  exit
end
exclude_file_paths = []
ARGV[5..-1].each do |exclude_file_path|
  if not File.exists?(exclude_file_path)
    puts "Usage: ./filter.rb seed_file_column_name seed_file_end_indicator path_to_seed_file exclude_file_column_name exclude_file_end_indicator path_to_exclude_file path_to_exclude_file .."
    exit
  end
  exclude_file_paths << exclude_file_path
end
​
# Parse arguments
seed_file_column_name = ARGV[0]
seed_file_end_indicator = ARGV[1]
path_to_seed_file = ARGV[2]
exclude_file_column_name = ARGV[3]
exclude_file_end_indicator = ARGV[4]
​
# Init variables, data structure for filtered entities and excel parsing
filtered_companies_index = []
filtered_companies = {}
exclude_companies_index = []
exclude_companies = {}
seed_wb = RubyXL::Parser.parse(path_to_seed_file)
filtered_wb = RubyXL::Workbook.new
​
def structure_workbook(wb, column_name, end_indicator)
  columns = []
  companies = {}
  worksheet = wb[0]
  lambda do
    worksheet.each do |row|
      if columns.empty?
        row.cells.each do |cell|
          columns << cell.value
        end
      else
        company = []
        row.cells.each do |cell|
          company << cell.value
          if columns[company.size - 1] == column_name
            return if end_indicator != "" and cell.value == end_indicator
            companies[cell.value] = company
          end
        end
      end
      if not columns.include? column_name
        columns.clear
      end
    end
  end.call
  return columns, companies
end
​
# Parse seed and exclude workbooks and populate data structures
companies_to_exclude = []
exclude_file_paths.each_with_index do |exclude_file_path, index|
  columns, companies_to_exclude[index] = structure_workbook(RubyXL::Parser.parse(exclude_file_path), exclude_file_column_name, exclude_file_end_indicator)
end
columns, seed_companies = structure_workbook(seed_wb, seed_file_column_name, seed_file_end_indicator)
​
# Find the differences
filtered_companies = seed_companies.dup
companies_to_exclude.each do |companies_to_exclude_tmp|
  filtered_companies = filtered_companies.dup.delete_if { |k,_| companies_to_exclude_tmp.key?(k) }
end
​
# Import results to the new Excel
columns.each_with_index do |column, index|
  filtered_wb.worksheets[0].insert_cell(0, index, column)
end
filtered_companies.each_with_index do |(key, value), row_index|
  value.each_with_index do |cell_value, cell_index|
    filtered_wb.worksheets[0].insert_cell(row_index + 1, cell_index, cell_value)
  end
end
​
filtered_wb.write('filtered.xlsx')
puts "Seed company excel: #{seed_companies.length}"
ARGV[5..-1].each_with_index do |exclude_file_path, index|
  puts "Exclude company excel #{exclude_file_path}: #{companies_to_exclude[index].length}"
end
puts "Filtered items: #{filtered.length}"
puts "--- The excel file filtered.xlsx has been generated ---"
```

#### 3. Run and test

- Open your terminal
- Run `gem install rubyXL` to install the dependency [rubyXL](https://github.com/weshatheleopard/rubyXL)
- Navigate to the directory where you put our Ruby scripts
- Input `ruby xxx.rb` (xxx is the name of Ruby script)
- There will be a usage message shown and you should follow the instruction
- Example: `ruby filter.rb seed_file_column_name seed_file_column_index seed_file_end_indicator path_to_seed_file exclude_file_column_name exclude_file_column_index exclude_file_end_indicator path_to_exclude_file`
- If the script is running correctly, a new Excel file called `filtered.xlsx` will be generated in the same directory and repeat items will be shown in your Terminal