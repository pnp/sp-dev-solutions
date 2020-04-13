using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MultilingualPagesConverter
{
    public enum Severity
    {
        Info,
        Warning,
        Error,
        Exception
    };

    interface ILogHelper
    {
        bool Log(string location, Severity severity, string message);
        bool HasErrors(Severity minSeverity);
        string GetErrors(Severity minSeverity);
        bool LogCleanup(int logKeepDays);
        void Dispose();
    }

    public sealed class LogHelper : ILogHelper
    {
        // Instantiate a SafeHandle instance.
        //private SafeFileHandle _handle = new SafeFileHandle(IntPtr.Zero, true);

        private readonly StreamWriter _logFile;
        private readonly Dictionary<Severity, int> _stats = new Dictionary<Severity, int>();
        private bool _echo = false;

        private LogHelper()
        {
            try
            {
                var current = Directory.GetCurrentDirectory();
                var logPath = Directory.CreateDirectory(current + "\\logs");
                var logArchive = DateTime.Now.Year.ToString() + DateTime.Now.Month.ToString() + DateTime.Now.Day.ToString();

                var time = "_" + DateTime.Now.Hour + DateTime.Now.Minute + DateTime.Now.Millisecond;
                _logFile = new StreamWriter(logPath + "\\log_" + logArchive + time + ".txt") { AutoFlush = true };
                _logFile.WriteLine("Severity\tTimestamp\tLocation\tMessage");
                _stats.Add(Severity.Info, 0);
                _stats.Add(Severity.Warning, 0);
                _stats.Add(Severity.Error, 0);
                _stats.Add(Severity.Exception, 0);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }

        private static readonly Lazy<LogHelper> lazy = new Lazy<LogHelper>(() => new LogHelper());
        public static LogHelper Instance => lazy.Value;

        public bool Echo
        {
            get { return _echo; }
            set { _echo = value; }
        }

        public bool Log(string location, Severity severity, string message)
        {
            try
            {
                var timestamp = $"{DateTime.Now.ToShortDateString()} {DateTime.Now.ToLongTimeString()}";
                _stats[severity] = _stats[severity] + 1;
                _logFile.WriteLine($"{timestamp}\t{severity.ToString()}\t{location}\t{message}");
                if (_echo)
                {
                    var severityString = severity.ToString();
                    switch (severity)
                    {
                        case Severity.Info:
                            break;
                        case Severity.Warning:
                            severityString = $"*{severityString}*";
                            break;
                        case Severity.Error:
                            severityString = $"!***{severityString}***!";
                            break;
                        case Severity.Exception:
                            severityString = $"@$%#{severityString}@$%#";
                            break;
                    }
                    Console.WriteLine($"{severityString} - {timestamp} - {location} - {message}");
                }
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }

        //Return true if number of Warnings, Errors, or Exceptions is greater than 0.
        public bool HasErrors(Severity minSeverity)
        {
            int total = 0;
            if ((int)minSeverity <= (int)Severity.Warning)
                total += _stats[Severity.Warning];
            if ((int)minSeverity <= (int)Severity.Error)
                total += _stats[Severity.Error];
            if ((int)minSeverity <= (int)Severity.Exception)
                total += _stats[Severity.Exception];

            return (total > 0);
        }

        //Return string array of logging stats for email
        public string GetErrors(Severity minSeverity)
        {
            string retVal = "";
            if ((int)minSeverity <= (int)Severity.Warning)
                retVal = "<div style=\"margin-left: 10px;\">Total Warnings: " + _stats[Severity.Warning].ToString() + "</div>";
            if ((int)minSeverity <= (int)Severity.Error)
                retVal += "<div style=\"margin-left: 10px;\">Total Errors: " + _stats[Severity.Error].ToString() + "</div>";
            if ((int)minSeverity <= (int)Severity.Exception)
                retVal += "<div style=\"margin-left: 10px;\">Total Exceptions: " + _stats[Severity.Exception].ToString() + "</div>";
            retVal += "<div>More information can be found in the log files on " + Environment.MachineName + " in " + Directory.GetCurrentDirectory() + "\\logs.</div>";

            return retVal;
        }

        //Remove logs previous to number of days specified
        public bool LogCleanup(int logKeepDays)
        {
            bool retVal = false;

            try
            {
                DateTime deleteBefore = DateTime.Today.AddDays(-logKeepDays);
                var current = Directory.GetCurrentDirectory();
                var logPath = Directory.CreateDirectory(current + "\\logs");
                var files = Directory.GetFiles(logPath.FullName).Where(x => new FileInfo(x).CreationTime.Date < deleteBefore.Date).ToArray();
                foreach (var file in files)
                {
                    File.Delete(file);
                }
                retVal = true;

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            return retVal;
        }
        // Public implementation of Dispose pattern callable by consumers.
        public void Dispose()
        {
            if (_logFile != null)
            {
                _logFile.Flush();
                _logFile.Close();
            }
            // ReSharper disable once GCSuppressFinalizeForTypeWithoutDestructor
            GC.SuppressFinalize(this);
        }

    }
}
