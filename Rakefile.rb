
require 'rubygems'
require 'bundler'
require 'pathname'
require 'logger'
require 'fileutils'
require 'data_mapper'

Bundler.require

ROOT        = Pathname(File.dirname(__FILE__))
LOGGER      = Logger.new(STDOUT)
BUNDLES     = %w( application.css application.js )
BUILD_DIR   = ROOT.join("public")
SOURCE_DIR  = ROOT.join("assets")



task :compile do
  sprockets = Sprockets::Environment.new(ROOT) do |env|
    env.logger = LOGGER
  end
  
  sprockets.append_path(SOURCE_DIR.join('javascripts').to_s)
  sprockets.append_path(SOURCE_DIR.join('templates').to_s)
  sprockets.append_path(SOURCE_DIR.join('stylesheets').to_s)
  
  BUNDLES.each do |bundle|
    assets = sprockets.find_asset(bundle)
    prefix, basename = assets.pathname.to_s.split('/')[-2..-1]
    FileUtils.mkpath BUILD_DIR.join(prefix)
    
    assets.to_a.each do |asset|
      # strip filename.css.foo.bar.css multiple extensions
      realname = asset.pathname.basename.to_s.split(".")[0..1].join(".")
      asset.write_to(BUILD_DIR.join(prefix, realname))
    end
    
    assets.write_to(BUILD_DIR.join(prefix, basename))
  end
end


task :environment do
  require 'delayed_job'
  require 'delayed_job_data_mapper'
  require './models'
  require './job'
  DataMapper.setup(:default, ENV['DATABASE_URL'] || "sqlite3://#{Dir.pwd}/db.sqlite3")
  DataMapper.finalize
end


namespace :jobs do
  desc "Clear the delayed_job queue."
  task :clear => :environment do
    Delayed::Job.delete_all
  end

  desc "Start a delayed_job worker."
  task :work => :environment do
    Delayed::Worker.new(
      :min_priority => ENV['MIN_PRIORITY'], 
      :max_priority => ENV['MAX_PRIORITY']).start
  end
end
