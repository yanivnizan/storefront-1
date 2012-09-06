# A sample Guardfile
# More info at https://github.com/guard/guard#readme

# Preprocess LESS CSS stylesheets
guard 'less', :all_on_start => true, :all_after_change => true do
  # notification :libnotify, :timeout => 1, :transient => true, :append => false, :urgency => :low
  # watch(%r{^.+\.less$})
  watch("css/store.less")
  watch("css/mixins/elements.less")         { "css/store.less" }
end

guard 'less', :all_on_start => true, :all_after_change => true, :output => "themes/css" do
  watch(%r{^themes/css/less/.+\.less$})
end


# Precompile handlebars.js components
guard 'steering', :output_folder => "js/views/components", :register_partials => true do
  watch(%r{^js/views/components/handlebars/.+\.handlebars$})
end

# Precompile handlebars.js templates
guard 'steering', :output_folder => "themes/templates", :register_partials => true do
  watch(%r{^themes/templates/handlebars/.+\.handlebars$})
end
