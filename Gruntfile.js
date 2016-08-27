module.exports = function (grunt) {
    // Project configuration.
    
    grunt.initConfig({
        pkg     : grunt.file.readJSON( 'package.json' ),
        copy: {
            main: {
                files:[
                    {
                        expand: true,
                        cwd: 'src',
                        src: '**',
                        dest: '../'
                    }
                ]
            }
        },
        replace : {
            plugin_file: {
                src: [ 'plugin.php' ],
                overwrite: true,
                replacements: [
                {
                    from: "{{namespace}}",
                    to: "<%= pkg.namespace %>"
                },
                {
                    from: "{{slug}}",
                    to: "<%= pkg.slug %>"
                },
                {
                    from: "{{prefix}}",
                    to: "<%= pkg.prefix %>"
                },
                {
                    from: "{{name}}",
                    to: "<%= pkg.plugin_name %>"
                },
                {
                    from: "{{description}}",
                    to: "<%= pkg.description %>"
                },
                {
                    from: "{{author}}",
                    to: "<%= pkg.author %>"
                },
                {
                    from: "{{url}}",
                    to: "<%= pkg.url %>"
                },
                {
                    from: "{{version}}",
                    to: "<%= pkg.version %>"
                }
                ]
            }
        }        
        gitclone: {
            clone: {
                options: {
                    repository: 'https://github.com/Desertsnowman/UIX',
                    branch: 'master',
                    directory: 'uix'
                }
            }
        },
        shell: {
            install: {
                command: 'npm install --prefix ./uix'
            },
            build: {
                command: "grunt --slug=<%= pkg.namespace %> --base ./uix --gruntfile ./uix/GruntFile.js default"
            }
        }        
    });

    //load modules
    grunt.loadNpmTasks( 'grunt-shell');
    grunt.loadNpmTasks( 'grunt-contrib-copy' );
    grunt.loadNpmTasks( 'grunt-git' );
    grunt.loadNpmTasks( 'grunt-text-replace' );

    //register default task
    grunt.registerTask( 'uix', [ 'copy', 'replace', 'gitclone', 'shell:install', 'shell:build' ] );

};
