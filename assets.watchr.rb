def run_sprockets
  print "\nCompiling... "
  system('rake compile')
  print "done.\n"
end


Signal.trap('INT') { abort("\n") }


watch( 'assets/javascripts/*') { run_sprockets}
watch( 'assets/templates/*') { run_sprockets}
