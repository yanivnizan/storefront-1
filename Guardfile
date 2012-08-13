# A sample Guardfile
# More info at https://github.com/guard/guard#readme

guard 'less', :all_on_start => true, :all_after_change => true do
  # notification :libnotify, :timeout => 1, :transient => true, :append => false, :urgency => :low
  # watch(%r{^.+\.less$})
  watch("css/generator.less")
  watch("css/store.less")
  watch("css/mixins/elements.less")         { "css/generator.less"  }
  watch("css/mixins/elements.less")         { "css/store.less"      }
  watch(%r{^css\/templates\/_.+\.less$})    { "css/store.less"      }
end
