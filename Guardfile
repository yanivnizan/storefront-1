# A sample Guardfile
# More info at https://github.com/guard/guard#readme

# Preprocess LESS CSS stylesheets
guard 'less', :all_on_start => true, :all_after_change => true do
  # notification :libnotify, :timeout => 1, :transient => true, :append => false, :urgency => :low
  # watch(%r{^.+\.less$})
  watch("css/store.less")
  watch("css/mixins/elements.less")         { "css/store.less" }
end

# Precompile handlebars.js components
guard 'steering', :output_folder => "js/views/components", :register_partials => true do
  watch(%r{^js/views/components/handlebars/.+\.handlebars$})
end


themes = ["basic", "grid", "muffinRush"]

# Precompile handlebars.js templates
guard :shell, :all_on_start => true do
  themes.each do |theme|
    watch(%r{^themes/#{theme}/templates/.+\.handlebars$}) do
      `handlebars themes/#{theme}/templates/*.handlebars > themes/#{theme}/templates.js`
    end
  end
end

# Precompile LESS stylesheets
guard 'less', :all_on_start => true, :all_after_change => true, :output => "themes/#{theme}" do
  themes.each do |theme|
    watch(%r{^themes/#{theme}/less/.+\.less$})
  end
end
