# A sample Guardfile
# More info at https://github.com/guard/guard#readme

# Preprocess LESS CSS stylesheets
guard 'less', :all_on_start => true, :all_after_change => true do
  # notification :libnotify, :timeout => 1, :transient => true, :append => false, :urgency => :low
  # watch(%r{^.+\.less$})
  watch("css/store.less")
  watch("css/mixins/elements.less")         { "css/store.less" }
end

guard 'less', :all_on_start => true, :all_after_change => true, :output => "css/templates" do
  watch(%r{^css/templates/less/.+\.less$})
end


# Precompile handlebars.js templates
guard 'steering', :register_partials => true do
  watch(%r{^js/views/templates/.+\.handlebars$})
end
