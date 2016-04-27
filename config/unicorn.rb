# config/unicorn.rb
worker_processes Integer(ENV["WEB_CONCURRENCY"] || 5)
timeout 120
preload_app true

app_path = File.expand_path(File.dirname(__FILE__) + '/..')

#listen "/var/sockets/unicorn.problem.sock"
#listen app_path + "/tmp/unicorn.style.sock", backlog: 64
listen 8080

pid "/tmp/unicorn.react-rails.pid"

stderr_path "log/unicorn.log"
stdout_path "log/unicorn.log"

before_fork do |server, worker|
  Signal.trap 'TERM' do
    puts 'Unicorn master intercepting TERM and sending myself QUIT instead'
    Process.kill 'QUIT', Process.pid
  end

  defined?(ActiveRecord::Base) and
    ActiveRecord::Base.connection.disconnect!
end

after_fork do |server, worker|
  Signal.trap 'TERM' do
    puts 'Unicorn worker intercepting TERM and doing nothing. Wait for master to send QUIT'
  end

  defined?(ActiveRecord::Base) and
    ActiveRecord::Base.establish_connection
end
