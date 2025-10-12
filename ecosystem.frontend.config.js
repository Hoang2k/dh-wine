module.exports = {
    apps: [{
      name: "ntlsvx-frontend",
      cwd: "/var/www/ntlsvx-frontend",
      script: ".next/standalone/server.js",
      args: "",
      instances: "max",             // cluster bằng số CPU
      exec_mode: "cluster",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
        HOSTNAME: "127.0.0.1",
      },
      out_file: "/var/www/ntlsvx-frontend/logs/out.log",
      error_file:"/var/www/ntlsvx-frontend/logs/error.log",
      merge_logs: true,
      max_memory_restart: "800M"
    }]
  }